import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoginUserDto } from './dto/Login-user.dto';
import { User } from './Entities/User.entity';
const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async findbyEmail(email: LoginUserDto['email']): Promise<User> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
