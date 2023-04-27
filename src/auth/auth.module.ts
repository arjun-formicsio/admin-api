import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserAuthService } from './user-auth.service';
import { AdminAuthService } from './admin-auth.service';
import { EncryptionService } from './encrypt.service';
import { UserService } from 'src/user/user.service';
import { AdminLocalStrategy } from './strategies/admin-local.strategy';
import { UserLocalStrategy } from './strategies/user-local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1y' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AdminLocalStrategy,
    UserLocalStrategy,
    JwtStrategy,
    AuthService,
    AdminAuthService,
    UserAuthService,
    EncryptionService
  ],
  exports: [
    AuthService,
    AdminAuthService,
    UserAuthService
  ]
})
export class AuthModule { }
