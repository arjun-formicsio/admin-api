import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
export class UpdateUserDto {

  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @IsNumber()
  @ApiProperty()
  age: number;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  img: string;

}
