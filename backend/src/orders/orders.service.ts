import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class OrdersService {
  async create(createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    return await prisma.order.create({
      data: {
        Customer: { connect: { id: createOrderDto.customerId } },
        Order_details: { createMany: { data: createOrderDto.products } },
      },
      include: {
        Customer: true,
        Order_details: true,
      },
    });
  }

  async findAll() {
    return await prisma.order.findMany({});
  }

  async findOne(id: number) {
    return await prisma.order_details.findMany({ where: { orderID: id } });
  }
}
