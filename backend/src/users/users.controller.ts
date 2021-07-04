import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Res,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/Login-user.dto';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  // Login method
  @Post('Login')
  async login(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.usersService.findbyEmail(body.email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    if (!(await bcrypt.compare(body.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }
    const jwt = await this.jwtService.signAsync({ id: user.id });
    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'Success',
    };
  }
}
