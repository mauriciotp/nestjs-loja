export class ProductEntity {
  id: string;
  userId: string;
  name: string;
  value: number;
  amount: number;
  description: string;
  characteristics: ProductCharacteristic[];
  images: ProductImage[];
  category: string;
}

class ProductImage {
  url: string;
  description: string;
}

class ProductCharacteristic {
  name: string;
  description: string;
}
