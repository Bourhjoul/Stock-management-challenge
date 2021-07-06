import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
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
