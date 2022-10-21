import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '@users/users.repository';
import { FilterQuery } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '@schema/user.schema';
import { UserModel } from '@users/test/helper/user.model';
import { userStub } from '@users/test/stubs/user.stub';

describe('UsersService', () => {
  let usersRepository: UsersRepository;
  describe('find operations', () => {
    let userModel: UserModel;
    let userFilterQuery: FilterQuery<User>;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UsersRepository,
          { provide: getModelToken(User.name), useClass: UserModel },
        ],
      }).compile();

      usersRepository = module.get<UsersRepository>(UsersRepository);
      userModel = module.get<UserModel>(getModelToken(User.name));

      userFilterQuery = { id: userStub()._id };

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let user: User;

        beforeEach(async () => {
          jest.spyOn(userModel, 'findOne');
          user = await usersRepository.findOne(userFilterQuery);
        });

        test('then it should call the userModel', () => {
          expect(userModel.findOne).toHaveBeenCalledWith(userFilterQuery, {
            _id: 0,
            __v: 0,
          });
        });

        test('then it should return a user', () => {
          expect(user).toEqual(userStub());
        });
      });
    });
    describe('find', () => {
      describe('when find is called', () => {
        let users: User[];

        beforeEach(async () => {
          jest.spyOn(userModel, 'find');
          users = await usersRepository.find(userFilterQuery);
        });

        test('then it should call the userModel', () => {
          expect(userModel.find).toHaveBeenCalledWith(userFilterQuery);
        });

        test('then it should return a user', () => {
          expect(users).toEqual([userStub()]);
        });
      });
    });
    describe('findOneAndUpdate', () => {
      describe('when findOneAndUpdate is called', () => {
        let user: User;

        beforeEach(async () => {
          jest.spyOn(userModel, 'findOneAndUpdate');
          user = await usersRepository.findOneAndUpdate(
            userFilterQuery,
            userStub(),
          );
        });

        test('then it should call the userModel', () => {
          expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(
            userFilterQuery,
            userStub(),
            { new: true },
          );
        });

        test('then it should return a user', () => {
          expect(user).toEqual(userStub());
        });
      });
    });
  });

  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UsersRepository,
          {
            provide: getModelToken(User.name),
            useValue: UserModel,
          },
        ],
      }).compile();

      usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
    });

    describe('create', () => {
      describe('when create is called', () => {
        let user: User;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(UserModel.prototype, 'save');
          constructorSpy = jest.spyOn(UserModel.prototype, 'constructorSpy');
          user = await usersRepository.create(userStub());
        });

        test('then it should call the userModel', () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(userStub());
        });

        test('then it should return a user', () => {
          expect(user).toEqual(userStub());
        });
      });
    });
  });
});
