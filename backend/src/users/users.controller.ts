import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/Login-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('Login')
  async login(@Body() body: LoginUserDto) {
    const user = await this.usersService.findbyEmail(body.email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    if (!(await bcrypt.compare(body.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }
    return user;
  }
}
