import { createCart, getCart, updateCart } from "@/lib/data/cart";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    let cart = await getCart(userId);
    
    if (!cart) {
      cart = await createCart(userId);
    }

    return NextResponse.json([cart]);
  } catch (error) {
    console.error("GET /api/cart error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, items } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }
        let cart = await getCart(userId);
    if (cart) {
      const updatedCart = await updateCart(userId, items || []);
      return NextResponse.json(updatedCart, { status: 200 });
    } else {
     cart = await createCart(userId);
       if (items && items.length > 0) {
        const finalCart = await updateCart(userId, items);
        return NextResponse.json(finalCart, { status: 200 });
      }
      
      return NextResponse.json(cart, { status: 201 });
    }
  } catch (error) {
    console.error("POST /api/cart error:", error);
    return NextResponse.json(
      { error: "Failed to create cart" },
      { status: 500 }
    );
  }
}