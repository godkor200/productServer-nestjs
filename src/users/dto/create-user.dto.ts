import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @IsNotEmpty()
  userName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(10)
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  userPwd: string;

  @IsNotEmpty()
  userClass: string;
}
