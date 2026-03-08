import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
