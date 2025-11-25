import { kv } from ".";
import { Cart } from "../types";

export async function getCart(userId: string): Promise<Cart | null> {
  try {
    return await kv.get<Cart>(`cart:${userId}`);
  } catch (error) {
    console.error("Error getting cart:", error);
    return null;
  }
}

export async function createCart(userId: string): Promise<Cart> {
  try {
    const cart: Cart = {
      id: crypto.randomUUID(),
      userId,
      items: [],
    };

    await kv.set(`cart:${userId}`, cart);
    return cart;
  } catch (error) {
    // console.error("Error creating cart:", error);
    throw error;
  }
}

export async function updateCart(
  userId: string,
  items: Cart["items"]
): Promise<Cart | null> {
  try {
    let cart = await getCart(userId);

    if (!cart) {
      cart = await createCart(userId);
    }

    cart.items = items;
    await kv.set(`cart:${userId}`, cart);

    return cart;
  } catch (error) {
    console.error("Error updating cart:", error);
    return null;
  }
}

export async function clearCart(userId: string): Promise<void> {
  try {
    await kv.del(`cart:${userId}`);
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
}
