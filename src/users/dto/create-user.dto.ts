import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
enum Authority {
  generalManager = 'general manager',
  commonManager = 'common manager',
}
export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @IsNotEmpty()
  @ApiProperty({ description: '관리자 이름' })
  userName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(10)
  @IsNotEmpty()
  @ApiProperty({ description: '관리자 아이디' })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '관리자 비밀번호' })
  userPwd: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '관리자 클래스(권한)', enum: Authority })
  userClass: string;
}
