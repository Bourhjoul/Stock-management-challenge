import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class OrdersService {
  async create(createOrderDto: CreateOrderDto) {
    createOrderDto.products.map(async (product) => {
      await prisma.product.update({
        where: { id: product.productID },
        data: { stockQty: { decrement: product.Qty || 1 } },
      });
    });
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

  async getCustomers() {
    return await prisma.customer.findMany({});
  }
}
