import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AdminAuthService } from '../admin-auth.service';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(private readonly adminauthService: AdminAuthService) {
    super();
  }

  async validate(username: string, password: string) {
    try {
      const user = await this.adminauthService.validateUser(username, password);
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (e) {
      return e;
    }
  }
}
