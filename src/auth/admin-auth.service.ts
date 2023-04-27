import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from './encrypt.service';

@Injectable()
export class AdminAuthService {
  private readonly logger = new Logger(AdminAuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly encService: EncryptionService
  ) { }

  async validateUser(username: string, pass: string) {
    try {
      if (username === this.configService.get('ADMIN_USERNAME')) {
        return this.encService.compare(
          pass,
          this.configService.get<string>('ADMIN_PASSWORD')
        );
      }
      this.logger.log(pass, 'Invalid admin credentials');
      throw new UnauthorizedException();
    } catch (e) {
      this.logger.error(e, 'Error');
      throw e;
    }
  }

  async authLogin() {
    const payload = {
      username: 'admin',
      role: 'admin',
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
