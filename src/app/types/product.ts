export interface Product {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CategoryProducts {
  categoryName: string;
  totalProducts: number;
  products: Product[];
}

export interface ProductDataType {
  id?: number;
  title: string;
  price: number | string;
  description: string;
  category: string;
  image?: string;
}
