import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { Roles } from './entities/user-roles.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('RolesService', () => {
  let rolesService: RolesService;

  const mockRepository = {
    findRoot: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Roles),
          useValue: mockRepository,
        },
      ],
    }).compile();

    rolesService = module.get<RolesService>(RolesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should throw an error if parent already exists and no parent provided', async () => {
      mockRepository.findRoot.mockResolvedValue(true);
      const newUser: CreateUserDto = {
        name: 'New Role',
        description: 'Description of New Role',
        parent: '', // No parent provided
      };

      await expect(rolesService.create(newUser)).rejects.toThrow(HttpException);
      expect(mockRepository.findRoot).toBeCalledTimes(1);
    });

    it('should create a new role without error when parent exists', async () => {
      mockRepository.findRoot.mockResolvedValue(true);
      mockRepository.findOne.mockResolvedValue({ id: 'parentRoleId' });

      const newUser: CreateUserDto = {
        name: 'New Role',
        description: 'Description of New Role',
        parent: 'parentRoleId', // Parent provided
      };

      await rolesService.create(newUser);

      expect(mockRepository.findRoot).toBeCalledTimes(0);
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });

    it('should create a new role without error when no parent exists', async () => {
      mockRepository.findRoot.mockResolvedValue(false);

      const newUser: CreateUserDto = {
        name: 'New Role',
        description: 'Description of New Role',
        parent: '', // No parent provided
      };

      await rolesService.create(newUser);

      expect(mockRepository.findRoot).toBeCalledTimes(1);
      expect(mockRepository.findOne).toBeCalledTimes(0);
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });
  });
});
