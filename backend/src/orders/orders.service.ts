import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class OrdersService {
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async findAll() {
    return await prisma.order.findMany({});
  }

  async findOne(id: number) {
    return await prisma.order_details.findMany({ where: { orderID: id } });
  }
}
