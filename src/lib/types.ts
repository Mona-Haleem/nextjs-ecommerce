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