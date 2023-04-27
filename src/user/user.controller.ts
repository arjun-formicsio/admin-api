import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from 'src/common/dto/updateUserDto';
import { ApiBody } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';
import { Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) { }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAllUsers() {
    return this.userService.findAll();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: UpdateUserDto })
  @Patch()
  updateUser(
    @Query('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.findOneAndUpdate(id, updateUserDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  deleteUser(@Query('id') id: string) {
    return this.userService.deleteOne(id);
  }

}
