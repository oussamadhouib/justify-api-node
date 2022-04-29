import { Controller, Post, Body, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {
  IUserService,
  USER_SERVICE_TOKEN,
} from '../common/interfaces/user.service.interface';

@Controller('api/users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private readonly userService: IUserService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
