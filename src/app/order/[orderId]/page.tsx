import OrderDetails from "@/componenets/order/OrderDetails";
import OrderSummary from "@/componenets/order/OrderSummery";
import { calculateShippingStatus } from "@/lib/data/deliveryDateCalculator";
import { getOrderById, updateOrder } from "@/lib/data/order";
//import { fetchOrder } from "@/lib/api/order";

export const dynamic = 'force-dynamic';

interface OrderPageProps {
  params: Promise<{orderId:string}>
}

export default async function OrderPage ({ params }: OrderPageProps) {
  const {orderId} = await params;
    const order = await getOrderById(orderId);
  
  if (!order) {
    return (
      <div className="container mx-auto p-4 my-25">
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <p className="text-red-800">Order not found</p>
        </div>
      </div>
    );
  }


  if (order.status !== "delivered") {
    const status = await calculateShippingStatus(order);
    if (status !== order.status) {
      await updateOrder(order.id, { status });
      order.status = status;
    }
  }

 // const order = await fetchOrder(orderId);
  return (
    <div className="container mx-auto p-4 my-25">

      <OrderDetails order={order} />
      <OrderSummary order={order} />
    </div>
  );
};


