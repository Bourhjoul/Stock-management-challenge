import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, Prisma } from '@prisma/client';
import { User } from './Entities/User.entity';
const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  constructor() {}
  async findOne(field: Prisma.UserWhereUniqueInput): Promise<User> {
    return await prisma.user.findUnique({
      where: field,
    });
  }
  async verifytoken(cookie: any) {
    // const data = await this.jwtService.verifyAsync(cookie);
    // return data;
  }
}
