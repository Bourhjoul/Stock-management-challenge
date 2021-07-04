import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/Login-user.dto';
import { User } from './Entities/User.entity';
const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async findOne(field: Prisma.UserWhereUniqueInput): Promise<User> {
    return await prisma.user.findUnique({
      where: field,
    });
  }
}
