// /app/api/orders/[id]/route.ts
import { calculateShippingStatus } from "@/lib/data/deliveryDateCalculator";
import { deleteOrder, getOrderById, updateOrder } from "@/lib/data/order";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order)
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  if( order.status == "delivered") return NextResponse.json(order);
  const status = calculateShippingStatus(order)
  if (status !== order.status) {
    await updateOrder(order.id, { status });
    order.status = status;
  }
  return NextResponse.json(order);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const updates = await request.json();
    const updated = await updateOrder(id, updates);

    if (!updated) {
      return NextResponse.json(
        { error: "Failed to update order" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Error updating order" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const success = await deleteOrder(id);

    if (!success) {
      return NextResponse.json(
        { error: "Failed to delete order" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error deleting order" },
      { status: 500 }
    );
  }
}
