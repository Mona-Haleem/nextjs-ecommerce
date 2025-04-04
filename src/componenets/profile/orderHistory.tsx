import React from 'react';
import { auth } from "@/lib/auth";

async function fetchOrderHistory(userId: string) {
  const res = await fetch(`http://localhost:3001/orders?userId=${userId}`);
  if (!res.ok) {
   return []; 
  }
  const data = await res.json();

  const sortedOrders = data.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return sortedOrders;
}

export default async function OrderHistory() {
  const session = await auth()
  const userId = session!.user.id;
  const orders = await fetchOrderHistory(userId);

  return (
    <div className='flex flex-col items-center justify-center p-4'>
       <h2 className="text-2xl font-semibold pb-2  w-50 ">Order History</h2>
    
      <ul className='w-full max-w-md bg-white rounded-lg max-h-20 overflow-y-auto shadow-lg'>
        {!orders.length && <p className='text-center'>No orders found.</p>}
        {orders.map((order: any) => (
         <li className="p-2 border-b border-gray-300 bg-white shadow-sm hover:bg-gray-100 transition" key={order.id}><span className={`${order.status === 'pending'? 'bg-gray-200':order.status === 'delivered'?'bg-green-100':'bg-orange-100'} w-5 h-5 rounded-full inline-block`}></span>  Total Items: {order.items.length} - {order.date} </li>
        ))}
      </ul>
    </div>
  );
}
