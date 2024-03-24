import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from './entities/user-roles.entity';
import { ERROR_MESSAGES } from './enums';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private roles: Repository<Roles>,
  ) {}

  async create(newRole: CreateUserDto) {
    if ((await this.findRoot()) && !newRole.parent)
      throw new HttpException(
        ERROR_MESSAGES.PARENT_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );

    let parent = null;
    if (newRole.parent)
      parent = await this.roles.findOne({
        where: { id: newRole.parent },
      });
    const role = this.roles.create({ ...newRole, parent });
    return this.roles.save(role);
  }

  async findRoot() {
    return this.roles.find({ where: { parent: null } });
  }

  async findAll() {
    return this.roles.find({ relations: ['parent'] });
  }

  async findOne(id: string) {
    return this.roles.findOne({ where: { id } });
  }

  async findChildrens(parentId: string) {
    return this.roles.find({ where: { parent: { id: parentId } } });
  }
}
