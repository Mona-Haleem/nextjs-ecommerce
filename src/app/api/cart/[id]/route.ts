import { clearCart, updateCart } from "@/lib/data/cart";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, items } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const cart = await updateCart(userId, items || []);

    if (!cart) {
      return NextResponse.json(
        { error: "Failed to update cart" },
        { status: 500 }
      );
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error("PUT /api/cart/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    await clearCart(userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/cart/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete cart" },
      { status: 500 }
    );
  }
}
