import { User } from './../../dist/user.interface.d';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateJWT(user: User): Promise<string> {
    return this.jwtService.signAsync({ user });
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  comparePassword(
    newPassword: string,
    passwordHash: string,
  ): Promise<any | boolean> {
    return bcrypt.compare(newPassword, passwordHash);
  }
}
