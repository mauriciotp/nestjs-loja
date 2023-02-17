class ListCharacteristicProductDTO {
  name: string;
  description: string;
}

class ListImageProductDTO {
  url: string;
  description: string;
}

export class ListProductDTO {
  id: string;
  userId: string;
  name: string;
  value: number;
  amount: number;
  description: string;
  category: string;
  characteristics: ListCharacteristicProductDTO[];
  images: ListImageProductDTO[];
}
