import OrderDetails from "@/componenets/order/OrderDetails";
import OrderSummary from "@/componenets/order/OrderSummery";
import axios from "axios";



interface OrderPageProps {
  params: Promise<{orderId:string}>
}

export default async function OrderPage ({ params }: OrderPageProps) {
  const {orderId} = await params;
  const response = await axios.get(`http://localhost:3001/orders/${orderId}`);
  const order = response?.data;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Order # {orderId} </h1>

      <OrderDetails order={order} />
      <OrderSummary order={order} />
    </div>
  );
};


