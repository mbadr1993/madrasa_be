import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Repository } from 'typeorm/repository/Repository.js';
import { AuthDto } from '../dto/auth.dto';
import { User } from '../shared-entitiy';

@Injectable({})
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  async signin(authDto: AuthDto) {
    const user = await this.userRepository.findOne({
      where: { userName: authDto.userName },
    });
    if (!user) {
      throw new UnauthorizedException('Unauthorized credentials');
    }

    const passwordMatches = await argon.verify(user.hash, authDto.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Unauthorized credentials');
    }

    return this.signToken(user.id, user.userName);
  }

  async signToken(
    userId: number,
    userName: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      userName,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    return {
      access_token: token,
    };
  }
}
