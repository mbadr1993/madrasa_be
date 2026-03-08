import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Repository } from 'typeorm';
import { User } from '../shared-entitiy';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   * Create a user if the username is not already taken.
   */
  async createUser(userDTO: CreateUserDto) {
    const { userName, firstName, lastName, phone } = userDTO;
    const existing = await this.userRepository.findOne({
      where: { userName },
    });
    if (existing) {
      // DB has a unique index as well, but we check first to provide nicer
      // feedback instead of a low‑level query error.
      throw new ConflictException('username already in use');
    }

    const hash = await argon.hash(userDTO.password);

    const user = this.userRepository.create({
      userName,
      firstName,
      lastName,
      phone,
      hash,
    });

    return this.userRepository.save(user);
  }

  getUSerById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  getAllUsers() {
    return this.userRepository.find();
  }
}
