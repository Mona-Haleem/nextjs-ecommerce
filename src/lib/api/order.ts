import { apiClient } from ".";
import { Order } from "../types";

export async function fetchOrderHistory(userId: string) {
  try {

    const response = await apiClient.get(`/api/orders?userId=${userId}`);
    const data = await response.data;
    const sortedOrders = data.sort(
      (a: Order, b: Order) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return sortedOrders;
  } catch {
    return [];
  }
}

export async function fetchOrder(id: string) {
  try {
    const response = await apiClient.get(`/api/orders/${id}`);
    return response.data;
  } catch {
    return null;
  }
}

export async function createOrderApi(orderData: Omit<Order, "id" | "date"|"status"|"expectedDeliveryDate">) {

  const response = await apiClient.post("/api/orders", orderData);
  return response.data;
}
