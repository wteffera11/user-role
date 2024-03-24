/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  parent: string;
}
