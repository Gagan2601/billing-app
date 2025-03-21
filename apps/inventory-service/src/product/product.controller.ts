import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product, Prisma } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAll(): Promise<Product[]> {
    return this.productService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Product | null> {
    return this.productService.getById(id);
  }

  @Post()
  create(@Body() data: Prisma.ProductCreateInput): Promise<Product> {
    return this.productService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Product>
  ): Promise<Product> {
    return this.productService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Product> {
    return this.productService.delete(id);
  }
}
