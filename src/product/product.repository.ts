import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private products: ProductEntity[] = [];

  async save(productData: ProductEntity) {
    this.products.push(productData);
    return productData;
  }

  async list() {
    return this.products;
  }

  private findById(id: string) {
    const possibleProduct = this.products.find((product) => product.id === id);

    if (!possibleProduct) {
      throw new Error('Product not found');
    }

    return possibleProduct;
  }

  async update(id: string, updateData: Partial<ProductEntity>) {
    const dataNotUpdatable = ['id', 'userId'];
    const product = this.findById(id);

    Object.entries(updateData).forEach(([key, value]) => {
      if (dataNotUpdatable.includes(key)) {
        return;
      }

      product[key] = value;
    });

    return product;
  }

  async remove(id: string) {
    const product = this.findById(id);

    const products = this.products.filter((product) => product.id !== id);

    this.products = products;

    return product;
  }
}
