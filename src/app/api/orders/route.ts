// /app/api/orders/route.ts
import { calculateExpectedDeliveryDate, calculateShippingStatus } from "@/lib/data/deliveryDateCalculator";
import { createOrder, getOrdersByUser, updateOrder } from "@/lib/data/order";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const orders = await getOrdersByUser(userId);

    await Promise.all(
      orders.map(async (order) =>{
        if( order.status == "delivered") return order
        const status = await calculateShippingStatus(order)
        if (status !== order.status) {
         await updateOrder(order.id, { status });
         order.status = status;
         }
      }
      )
    );
    console.log(orders)
    return NextResponse.json(orders);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, items, address, totalPrice } = body;

    if (!userId || !items || !address || !totalPrice) {
      return NextResponse.json(
        { error: "Missing order fields" },
        { status: 400 }
      );
    }

    const order = await createOrder({
      userId,
      items,
      address,
      totalPrice,
      status: "pending",
      expectedDeliveryDate: calculateExpectedDeliveryDate(items, new Date()),
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

