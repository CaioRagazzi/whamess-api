/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);
    if (user && user.password === pass) {
      const { id, name, email } = user;
      return { id, name, email };
    }
    return null;
  }

  async login(user: any) {
    const { id } = await this.usersService.getByEmail(user.email);
    
    const payload = { email: user.email, id };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}