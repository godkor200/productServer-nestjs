import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@users/users.service';
import { UsersController } from '@users/users.controller';
import { User } from '@schema/user.schema';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { userStub } from '@users/test/stubs/user.stub';

jest.mock('../users.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('createUser', () => {
    describe('when create is called', () => {
      let user: User;
      let createUserDto: CreateUserDto;

      beforeEach(async () => {
        createUserDto = {
          userName: userStub().userName,
          userId: userStub().userId,
          userClass: userStub().userClass,
          userPwd: userStub().userPwd,
        };
        user = await usersController.create(createUserDto);
      });

      test('then it should call usersService', () => {
        expect(usersService.create).toHaveBeenCalledWith(
          createUserDto.userName,
          createUserDto.userId,
        );
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
