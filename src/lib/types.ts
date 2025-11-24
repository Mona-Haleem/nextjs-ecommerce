import { AdapterUser } from "next-auth/adapters";

export type Product = {
    id: number;
    title: string;
    image: string;
    category: string;
    price: number;
};

export type CartItemData ={
    id: number;
    title: string;
    image: string;
    category: string;
    price: number;
    quantity:number;

}


export type Order = {
    id: number;
    userId: string;
    items: Array<{ id: number; name: string; price: number; quantity: number }>;
    totalPrice: number;
    date: string;
    address: string;
    status: string;
  }

  export type AppUser = AdapterUser & {
  phoneNumber: string;
  username : string
};
