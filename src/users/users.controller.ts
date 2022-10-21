import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UpdateUserDto } from '@users/dto/update-user.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@schema/user.schema';

@Controller('v1/users')
@ApiTags('관리자 API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: '관리자 생성 API', description: '유저 생성' })
  @ApiCreatedResponse({
    description: '관리자를 생성한다.',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: '관리자 찾기 API',
    description: '전체 유저 불러오기',
  })
  @ApiCreatedResponse({
    description: '관리자를 조회한다.',
    type: [User],
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '관리자 찾기 API',
    description: '유저 불러오기',
  })
  @ApiCreatedResponse({
    description: '하나의 관리자를 조회한다.',
    type: User,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: '관리자 업데이트 API',
    description: '유저 업데이트',
  })
  @ApiCreatedResponse({
    description: '하나의 관리자를 업데이트 한다.',
    type: User,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '관리자 삭제 API',
    description: '유저 삭제',
  })
  @ApiCreatedResponse({
    description: '하나의 관리자를 삭제 한다.',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
