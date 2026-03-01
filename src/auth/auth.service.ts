import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Repository } from 'typeorm/repository/Repository.js';
import { User } from '../shared-entitiy';
import { AuthDto } from './dto/auth.dto';

@Injectable({})
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signin(authDto: AuthDto) {
    // find the user by username
    // if not found, throw an error
    const user = await this.userRepository.findOne({
      where: { userName: authDto.userName },
    });
    if (!user) {
      throw new UnauthorizedException('Unauthorized credentials');
    }
    // compare the password with the stored hash
    // if it doesn't match, throw an error
    const passwordMatches = await argon.verify(user.hash, authDto.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Unauthorized credentials');
    }

    const response = {
      userName: user.userName,
    };

    // if it matches, generate a JWT and return it
    return response;
  }
}
