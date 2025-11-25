import { Order } from "@/lib/types";
import Link from "next/link";

interface OrderSummaryProps {
  order: Order;
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      <ul>
        {order?.items.map((item) => (
          <li key={item.id} className="p-2 border-b border-gray-300 bg-white shadow-sm hover:bg-gray-100 transition " >
            <Link href={`/products/${item.id}`} className="hover:text-blue-500 flex justify-between">
            <span>{item.title}</span>
            <span>{item.stock} x ${item.price.toFixed(2)}</span>
          </Link>
          </li>
        ))}
        
      </ul>
      <div className="flex justify-between font-semibold mt-4">
        <span>Total:</span>
        <span>${order?.totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
