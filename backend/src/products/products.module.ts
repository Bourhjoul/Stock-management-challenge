import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersService],
  controllers: [ProductsController],
  providers: [ProductsService, UsersModule],
})
export class ProductsModule {}
