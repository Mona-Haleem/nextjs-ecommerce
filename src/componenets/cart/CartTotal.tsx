import { Product } from "@/lib/types";


export default function CartTotal({ cartItems }: { cartItems: Product[] }) {
  const totalPrice = cartItems?.reduce((total, item) => {
    return total + item.price * (1 - (item.discountPercentage/100 || 0)) * item.stock;
  }, 0);

  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <h2 className="text-xl font-semibold">Cart Total</h2>
      <p className="text-lg">Total: ${totalPrice?.toFixed(2)}</p>
    </div>
  );
}
