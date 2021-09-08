import { User } from './../../dist/user.interface.d';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
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
