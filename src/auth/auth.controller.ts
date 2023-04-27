import { Body, Controller, Logger, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { LoginDto } from 'src/common/dto/loginDto';
import { AdminAuthService } from './admin-auth.service';
import { UserAuthService } from './user-auth.service';
import { CreateUserDto } from '../common/dto/createUserDto';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Role } from 'src/common/enums/roles.enum';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly UserService: UserService,
    private readonly UserAuthService: UserAuthService,
    private readonly AdminAuthService: AdminAuthService,
  ) { }


  @ApiOkResponse({ description: 'admin logged in' })
  @UseGuards(AdminAuthGuard)
  @ApiBody({ type: LoginDto, description: 'login for admin' })
  @Post('admin/login')
  async authLoginAdmin(@Request() req) {
    if (req?.user?.status == 401) throw new UnauthorizedException();
    else return this.authService.authLogin();
  }

  @ApiOkResponse({ description: 'admin logged in' })
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: CreateUserDto, description: 'login for admin' })
  @Post('user/register')
  async authUserRegister(@Request() req, @Body() createUserDto: CreateUserDto) {
    if (req?.user?.status == 401) throw new UnauthorizedException();
    return this.UserService.registerUser(createUserDto);
  }

  @ApiOkResponse({ description: 'admin logged in' })
  @UseGuards(AdminAuthGuard)
  @ApiBody({ type: LoginDto, description: 'login for admin' })
  @Post('user/login')
  async authUserLogin(@Request() req) {
    if (req?.user?.status == 401) throw new UnauthorizedException();
    else return this.UserAuthService.authLogin(req.body);
  }
}
