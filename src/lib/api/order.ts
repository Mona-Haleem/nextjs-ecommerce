import { apiClient } from ".";
import { Order } from "../types";

export async function fetchOrderHistory(userId: string) {
  try {
    console.log("fetching all order");

    const response = await apiClient.get(`/api/orders?userId=${userId}`);
    const data = await response.data;
    console.log(data)
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
    console.log("fetching order");
    const response = await apiClient.get(`/api/orders/${id}`);
    return response.data;
  } catch {
    return null;
  }
}

export async function createOrderApi(orderData: Omit<Order, "id" | "date"|"status"|"expectedDeliveryDate">) {
  console.log("create order");

  const response = await apiClient.post("/api/orders", orderData);
  return response.data;
}
