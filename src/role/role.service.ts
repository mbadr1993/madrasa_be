import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from 'src/dto/role.dto';
import { Role } from 'src/shared-entitiy/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async createRole(roleDTOL: CreateRoleDto) {
    const { roleName } = roleDTOL;
    const existing = await this.roleRepository.findOne({
      where: { roleName },
    });
    if (existing) {
      throw new Error('role already exists');
    }
    const role = this.roleRepository.create({ roleName });
    return this.roleRepository.save(role);
  }
}
