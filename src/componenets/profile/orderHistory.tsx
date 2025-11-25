import React from "react";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Order } from "@/lib/types";
// import { fetchOrderHistory } from "@/lib/api/order";
import { getOrdersByUser } from "@/lib/data/order";
import { calculateShippingStatus } from "@/lib/data/deliveryDateCalculator";

export default async function OrderHistory() {
  const session = await auth();
  const userId = session?.user?.id;
  
  let orders = [] as Order[];
  if(userId){
  orders = await getOrdersByUser(userId!);

  // Update statuses (same logic as in your API route)
  await Promise.all(
    orders.map(async (order) => {
      if (order.status === "delivered") return order;
      const status = await calculateShippingStatus(order);
      if (status !== order.status) {
        const { updateOrder } = await import("@/lib/data/order");
        await updateOrder(order.id, { status });
        order.status = status;
      }
    })
  );

  // Sort by date (newest first)
 orders = orders.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );}


  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-semibold pb-2  w-50 ">Order History</h2>

      <ul className="w-full max-w-md bg-white rounded-lg max-h-20 overflow-y-auto shadow-lg">
        {!orders?.length && <p className="text-center">No orders found.</p>}
        {orders?.map((order: Order) => (
          <li
            className="p-2 border-b border-gray-300 bg-white shadow-sm hover:bg-gray-100 transition"
            key={order.id}
          >
            <Link
              href={`/order/${order.id}`}
              className="flex justify-center items-center gap-5 hover:text-blue-500"
            >
              <span
                className={`${
                  order.status === "pending"
                    ? "bg-gray-200"
                    : order.status === "delivered"
                    ? "bg-green-100"
                    : "bg-orange-100"
                } w-5 h-5 rounded-full inline-block`}
              ></span>{" "}
              Total Items: {order.items.length} -{" "}
              {new Date(order.date).toLocaleDateString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
