import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import mongoose, { Model } from 'mongoose';
import { UserDocument, UserSchema } from '@schema/user.schema';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { getModelToken } from '@nestjs/mongoose';

const USER_MODEL = mongoose.model('User', UserSchema);
const mockRepository = {
  find() {
    return {};
  },
};
describe('UsersService', () => {
  let userService: UsersService;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<UserDocument>>(USER_MODEL);
  });

  describe('UsersService', () => {
    describe('관리자 생성', () => {
      it('파라미터가 누락됐을 경우 오류를 발생시킨다.', async () => {
        const userDto: CreateUserDto = {
          userName: '유병국',
          userId: undefined,
          userClass: undefined,
          userPwd: '1234',
        };
        // const userCreateSpy = jest
        //   .spyOn(userModel, 'create')
        //   .mockResolvedValue(undefined);
        try {
          await userService.create(userDto);
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});
