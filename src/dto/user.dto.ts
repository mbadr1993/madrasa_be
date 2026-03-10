import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Unique } from 'typeorm';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Unique(['userName'])
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  phone: string;

  @IsNumber({}, { each: true })
  roles: number[];
}

export class UpdateUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  // allow partial updates - these fields are optional
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsNumber({}, { each: true })
  @IsOptional()
  roles?: number[];
}
