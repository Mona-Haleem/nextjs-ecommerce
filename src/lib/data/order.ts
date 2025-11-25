import { kv } from ".";
import { Order } from "../types";

// Get a single order by ID
export async function getOrderById(orderId: string): Promise<Order | null> {
  try {
    return await kv.get<Order>(`order:${orderId}`);
  } catch (error) {
     console.error("Error getting order:", error);
    return null;
  }
}

// Get all orders for a user
export async function getOrdersByUser(userId: string): Promise<Order[]> {
  try {
    const keys = await kv.keys(`order:*`);
    const orders: Order[] = [];

    for await (const key of keys) {
      const order = await kv.get<Order>(key);
      if (order && order.userId === userId) {
        orders.push(order);
      }
    }

    return orders;
  } catch (error) {
    console.error("Error getting user's orders:", error);
    return [];
  }
}

// Create a new order
export async function createOrder(
  data: Omit<Order, "id" | "date">
): Promise<Order> {
  try {
    const order= {
      ...data,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };

    await kv.set(`order:${order.id}`, order);
    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

// Update an existing order
export async function updateOrder(
  orderId: string,
  updates: Partial<Order>
): Promise<Order | null> {
  try {
    const existing = await getOrderById(orderId);
    if (!existing) return null;

    const updated: Order = {
      ...existing,
      ...updates,
    };

    await kv.set(`order:${orderId}`, updated);
    return updated;
  } catch (error) {
     console.error("Error updating order:", error);
    return null;
  }
}

// Delete an order
export async function deleteOrder(orderId: string): Promise<boolean> {
  try {
    await kv.del(`order:${orderId}`);
    return true;
  } catch (error) {
     console.error("Error deleting order:", error);
    return false;
  }
}
