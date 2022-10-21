import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@users/users.service';
import { userStub } from '@users/test/stubs/user.stub';
import { UsersController } from '@users/users.controller';
import { User } from '@schema/user.schema';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UpdateUserDto } from '@users/dto/update-user.dto';

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
    jest.clearAllMocks();
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
        const { userName, userId, userClass, userPwd } = createUserDto;
        expect(usersService.create).toHaveBeenCalledWith({
          userName,
          userId,
          userClass,
          userPwd,
        });
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getUser', () => {
    describe('when getUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersController.findOne(userStub()._id.toString());
      });

      test('then it should call usersService', () => {
        expect(usersService.findOne).toBeCalledWith(userStub()._id.toString());
      });

      test('then is should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await usersController.findAll();
      });

      test('then it should call usersService', () => {
        expect(usersService.findAll).toHaveBeenCalled();
      });

      test('then it should return users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: User;
      let updateUserDto: UpdateUserDto;

      beforeEach(async () => {
        updateUserDto = {
          userPwd: userStub().userPwd,
        };
        user = await usersController.update(
          userStub()._id.toString(),
          updateUserDto,
        );
      });

      test('then it should call usersService', () => {
        expect(usersService.update).toHaveBeenCalledWith(
          userStub()._id.toString(),
          updateUserDto,
        );
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
  describe('deleteUser', () => {
    describe('when deleteUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersController.remove(userStub()._id.toString());
      });

      test('then it should call usersService', () => {
        expect(usersService.remove).toHaveBeenCalledWith(
          userStub()._id.toString(),
        );
      });

      test('then it should return a user', () => {
        expect(user).toEqual([]);
      });
    });
  });
});
