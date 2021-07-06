import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/guards/jwt-auth.guard';
import { PrismaClient } from '@prisma/client';
import { ProductsService } from 'src/products/products.service';

const prisma = new PrismaClient();

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private productsService: ProductsService,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const orders = await this.ordersService.findAll();
    const orderwithcustomer = orders.map(async (order) => {
      const customer = await prisma.customer.findUnique({
        where: { id: order.id },
      });
      return { ...order, customer: customer.name };
    });
    return Promise.all(orderwithcustomer);
  }

  // Gets all products related to a specific order
  @UseGuards(JwtAuthGuard)
  @Get('products/:id')
  async findproducts(@Param('id') id: string) {
    const orderDetails = await this.ordersService.findOne(+id);
    const products = orderDetails.map(async (order) => {
      const product = await this.productsService.findOne(order.productID);
      const productWithQty = {
        ...product,
        Qty: order.Qty,
        Order_id: order.orderID,
      };
      return productWithQty;
    });

    return Promise.all(products);
  }
}
