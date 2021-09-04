import { User } from './../../dist/user.interface.d';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // generateJWT(user: User): Promise<string> {
  //   return this.jwtService.signAsync({ user });
  // }

  // hashPassword(password: string): Promise<string> {
  //   return bcrypt.hash(password, 12);
  // }

  // comparePassword(
  //   newPassword: string,
  //   passwordHash: string,
  // ): Promise<any | boolean> {
  //   return bcrypt.compare(newPassword, passwordHash);
  // }
}
