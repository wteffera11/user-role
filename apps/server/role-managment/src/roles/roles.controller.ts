import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() newRole: CreateUserDto) {
    console.log(newRole);
    return this.rolesService.create(newRole);
  }
  @Get()
  async findAll() {
    return this.rolesService.findAll();
  }

  @Get('root')
  async findRoot() {
    return this.rolesService.findRoot();
  }

  @Get('id')
  async findById(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Get(':parentId/children')
  async findChildrens(@Param('parentId') parentId: string) {
    return this.rolesService.findChildrens(parentId);
  }
}
