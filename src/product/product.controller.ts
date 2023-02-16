import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';
import { v4 as uuid } from 'uuid';
import { ListProductDTO } from './dto/ListProduct.dto';

@Controller('/products')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Post()
  async createProduct(@Body() productData: CreateProductDto) {
    const productEntity = new ProductEntity();
    productEntity.id = uuid();
    productEntity.amount = productData.amount;
    productEntity.category = productData.category;
    productEntity.characteristics = productData.characteristics;
    productEntity.name = productData.name;
    productEntity.userId = productData.userId;
    productData.value = productData.value;
    productEntity.description = productData.description;

    const savedProduct = this.productRepository.save(productEntity);

    return savedProduct;
  }

  @Get()
  async listProducts() {
    return this.productRepository.list();
  }
}
