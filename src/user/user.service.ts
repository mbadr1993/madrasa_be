import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { User } from '../shared-entitiy';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(userDTO: CreateUserDto) {
    const { userName, firstName, lastName, phone, password, roles } = userDTO;
    const existing = await this.userRepository.findOne({
      where: { userName },
    });
    if (existing) {
      throw new ConflictException('username already in use');
    }

    const hash = await argon.hash(password);

    const user = this.userRepository.create({
      userName,
      firstName,
      lastName,
      phone,
      hash,
      roles: roles.map((id) => ({ id })),
    });

    return this.userRepository.save(user);
  }

  getUSerById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  getAllUsers() {
    return this.userRepository.find();
  }

  async updateUser(dto: UpdateUserDto) {
    const { id, firstName, lastName, phone, roles } = dto;
    const existingUser = await this.userRepository.findOne({
      where: { id },
    });
    if (!existingUser) {
      throw new ConflictException('user not found');
    }
    const user = this.userRepository.create({
      id,
      userName: existingUser.userName,
      firstName,
      lastName,
      phone,
      hash: existingUser.hash,
      roles: roles?.map((id) => ({ id })),
    });
    return this.userRepository.save(user);
  }
}
