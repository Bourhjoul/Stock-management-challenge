import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ProductsService {
  async create(createProductDto: CreateProductDto) {
    return await prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll() {
    return await prisma.product.findMany();
  }

  async findOne(id: number) {
    return await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        designation: true,
        price: true,
      },
    });
  }
}
