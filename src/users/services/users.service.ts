import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private readonly users: Users[];

  constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {
    this.users = [
      {
        id: 1,
        name: 'caio',
        email: 'caio@caio.com.br',
        password: 'caiocaio',
        createdOn: new Date(),
        isActive: true,
      },
    ];
  }

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<Users> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}