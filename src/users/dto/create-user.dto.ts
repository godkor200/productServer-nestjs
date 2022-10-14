import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  userName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(10)
  userId: string;

  @IsString()
  // @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  userPwd: string;

  userClass: string;
}
