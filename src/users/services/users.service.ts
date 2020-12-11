import { Injectable, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users, MessagesInfo } from '../entities/users.entity';
import { Repository, getConnection } from 'typeorm';
import { UsersDTO, UpdateUsersDTO, MessagesInfoDTO } from '../DTOs/users.dto';

@Injectable()
export class UsersService {
  private readonly users: Users[];
  private readonly messagesinfo: MessagesInfo[];

  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(MessagesInfo) private messagesinfoRepository: Repository<MessagesInfo>) {

  }

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<Users> {
    return this.usersRepository.findOne(id);
  }

  async getByEmail(email: string) {
    return await this.usersRepository.findOne({ email });
  }

  async updateUser(data: UsersDTO, param: number) {

    await this.usersRepository.update({ id: param }, data)

    return await this.usersRepository.findOne({
      where: { email: data.email }
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(data: UsersDTO) {
    const user = await this.usersRepository.create(data);
    try {
      let checkexists = await this.usersRepository.findOne({ email: data.email });
      if (checkexists.email === data.email) {
        return new BadRequestException('Cadastro existente');
      }
    } catch {
      await this.usersRepository.save(user);
      return user;
    }
  }

  async messagescount(id: number, rows: string) {
    const property = await this.usersRepository.findOne({
      where: { id }
    });

    const count = parseInt(property.messagesCount.toString()) + parseInt(rows)

    await getConnection()
      .createQueryBuilder()
      .update(Users)
      .set({ messagesCount: count })
      .where("id = :id", { id })
      .execute();
    return await this.usersRepository.findOne({
      where: { id }
    });
  }

  async messagesInfo(data: MessagesInfoDTO) {
    let date = new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"}).slice(0,10);
    const user = await this.messagesinfoRepository.create(data);
    const property = await this.messagesinfoRepository.findOne({
      where: { usr_id: data.usr_id, mes_date: date }
    })

    if (property === undefined) {
      await this.messagesinfoRepository.save(user);
    } else {
      const count = property.mes_messagesperday + data.mes_messagesperday

      await getConnection()
        .createQueryBuilder()
        .update(MessagesInfo)
        .set({ 
          usr_id: data.usr_id,
          mes_messagesperday: count,

        })
        .where("usr_id = :usr_id and mes_date = :mes_date", { usr_id: data.usr_id, mes_date: date })
        .execute();
    }

    return await this.messagesinfoRepository.findOne({
      where: { usr_id: data.usr_id, mes_date: date  }
    });
  }
  
  async messagesPerDay(id: string) {

    
    return getConnection().createQueryBuilder(MessagesInfo, 'messages_info')
    .orderBy('mes_date', 'DESC')
    .where("usr_id = :usr_id and DAY(mes_date) = DAY(NOW()) AND month(mes_date) = MONTH(NOW())", { usr_id: id })
    .getMany();
  }

  async messagesPerWeek(id: string) {
    return await getConnection().createQueryBuilder(MessagesInfo, 'messages_info')
    .orderBy('mes_date', 'DESC')
    .where("usr_id = :usr_id and mes_date > DATE_ADD(CURRENT_DATE(), INTERVAL -7 DAY)", { usr_id: id })
    .getMany(); 
  }  

  async messagesPerMonth(id: string) {

    
    return getConnection().createQueryBuilder(MessagesInfo, 'messages_info')
    .orderBy('mes_date', 'DESC')
    .where("usr_id = :usr_id and month(mes_date) = MONTH(NOW())", { usr_id: id })
    .getMany();
  } 
}