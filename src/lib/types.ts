import { AdapterUser } from "next-auth/adapters";
export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  thumbnail: string;
  images: string[];
  image?: string;
}

export interface ProductsResponse {
  products: Product[];
  total?: number;
  skip?: number;
  limit?: number;
}


export type CartItemData = {
  id: number;
  title: string;
  image: string;
  category: string;
  price: number;
  stock: number;
};
export type OrderItem = { id: number; name: string; price: number; stock: number }
export type Order = {
  id: string;
  userId: string;
  items: Array<Product>;
  totalPrice: number;
  date: string;
  address: string;
  status?: string;
  expectedDeliveryDate:string;
};

export type AppUser = AdapterUser & {
  phoneNumber?: string;
  username: string;
  password?: string;
  provider?: string, 
  providerAccountId?: string       
  
};

export interface User extends AdapterUser{
  id: string;
  username: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  provider?: string, 
  providerAccountId?: string       
}

export interface Cart {
  id: string;
  userId: string;
  items: Array<{
    productId: number;
    stock: number;
    name: string;
    price: number;
    image: string;
  }>;
}
