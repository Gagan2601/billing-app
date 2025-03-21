import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from '@billing-app/database';

@Module({
  imports: [DatabaseModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
