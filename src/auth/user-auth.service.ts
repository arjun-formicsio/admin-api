import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from './encrypt.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserAuthService {
  private readonly logger = new Logger(UserAuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly encService: EncryptionService
  ) { }

  async validateUser(email: string, pass: string) {
    try {
      const user = await this.userService.emailExistsActiveUser(
        email.toLowerCase()
      );

      if (user) {
        const match = await this.encService.compare(pass, user['password']);
        if (match) {
          const { password, ...results } = user;
          return match ? results : null;
        }
        throw new UnauthorizedException();
      }
    } catch (e) {
      this.logger.log(e, 'Error ');
      throw e;
    }
  }

  async authLogin(user: any) {
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    const { password, ...userData } = user;
    return {
      access_token: this.jwtService.sign(payload),
      userData,
    };
  }
}
