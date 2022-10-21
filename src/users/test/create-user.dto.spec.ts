import { stringified } from '@utils/helperFunc/test.helper';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
/**
 * ref : https://stackoverflow.com/questions/60852170/nestjs-how-to-unit-test-a-dto
 */
describe('CreateUserDto', () => {
  describe('should throw', () => {
    test.each([
      ['userName', 'number', 'string'],
      ['userId', 'number', 'string'],
      ['userPwd', 'number', 'string'],
      ['userClass', 'number', 'string'],
    ])('when the %s is a %s', async (first, second, exprected) => {
      const info = { [second]: 134 };
      const userDto = plainToInstance(CreateUserDto, info);
      const errors = await validate(userDto);
      expect(errors.length).not.toBe(0);
      expect(stringified(errors)).toContain(first + ' must be a ' + exprected);
    });

    test.each([
      ['userName', 2, 30],
      ['userId', 2, 10],
    ])('when out of length', async (first, second, exprected) => {
      const info = { [first]: 1 };
      const userDto = plainToInstance(CreateUserDto, info);
      const errors = await validate(userDto);
      expect(errors.length).not.toBe(0);
      expect(stringified(errors)).toContain(
        first +
          ' must be shorter than or equal to ' +
          exprected +
          ' characters',
      );
      expect(stringified(errors)).toContain(
        first + ' must be longer than or equal to ' + second + ' characters',
      );
    });
  });
});
