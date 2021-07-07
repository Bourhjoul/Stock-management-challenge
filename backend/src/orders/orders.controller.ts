import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
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

  // post new order

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  // Gets all orders
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const orders = await this.ordersService.findAll();
    const orderwithcustomer = orders.map(async (order) => {
      const customer = await prisma.customer.findUnique({
        where: { id: order.customerId },
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

  //Gets all customers (no need to create another route.)
  @UseGuards(JwtAuthGuard)
  @Get('customers')
  async findcustomers() {
    return this.ordersService.getCustomers();
  }
}
