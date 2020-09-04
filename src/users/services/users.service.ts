import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { UsersDTO } from '../DTOs/users.dto';

@Injectable()
export class UsersService {
  private readonly users: Users[];

  constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {
    
  }

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<Users> {
    return this.usersRepository.findOne(id);
  }

  async getByEmail(email: string) {
    return await this.usersRepository.findOne( { email } );
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(data: UsersDTO) {
    const user = await this.usersRepository.create(data);
    await this.usersRepository.save(user);
    return user;
  }
}