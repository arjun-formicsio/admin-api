import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UserAuthService } from '../user-auth.service';

@Injectable()
export class UserLocalStrategy extends PassportStrategy(
  Strategy,
  'user'
) {
  constructor(
    private readonly userauthService: UserAuthService
  ) {
    super();
  }

  async validate(email: string, password: string) {
    console.log("user-local")
    const user = await this.userauthService.validateUser(
      email,
      password
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
