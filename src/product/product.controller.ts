import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { ProductRepository } from './product.repository';

@Controller('/products')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Post()
  async createProduct(@Body() productData: CreateProductDto) {
    this.productRepository.save(productData);
    return productData;
  }

  @Get()
  async listProducts() {
    return this.productRepository.list();
  }
}
