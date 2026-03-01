import { IsNotEmpty, IsString } from 'class-validator';
import { Unique } from 'typeorm';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Unique(['userName'])
  userName: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
