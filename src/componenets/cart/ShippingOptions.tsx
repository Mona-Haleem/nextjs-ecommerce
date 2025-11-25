"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import FloatingLabelInput from "../profile/Input";
import { Order, Product } from "@/lib/types";
import { useCart } from "@/hooks/useCart";
import { createOrderApi } from "@/lib/api/order";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { cart, clearCart } = useCart(userId);
  const router = useRouter();

  const shippingOptions = [
    { name: "Standard Shipping", price: 5.0 },
    { name: "Express Shipping", price: 15.0 },
    { name: "Overnight Shipping", price: 30.0 },
  ];

  const [formData, setFormData] = useState({
    address: "",
    shipping: shippingOptions[0].name,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedShipping = shippingOptions.find(
      (option) => option.name === formData.shipping
    );
    if (cart.items.length == 0) {
      alert("Can't place the order without items");
      return;
    }
    const shippingCost = selectedShipping?.price || 0;
    const itemsTotal = cart.items.reduce(
      (sum: number, item: Product & { stock: number }) =>
        sum + (item.price * (1 - item.discountPercentage)) * item.stock,
      0
    );

    const totalPrice = itemsTotal + shippingCost;

    const newOrder = {
      userId: session?.user?.id,
      items: cart.items,
      totalPrice,
      address: formData.address,
      date: new Date().toISOString().split("T")[0],
    };
    
    try {
      const order = await createOrderApi(
        newOrder as Omit<Order, "id" | "date"|"status"|"expectedDeliveryDate">
      );
      await clearCart();
      router.push(`/order/${order.id}`);

      alert("Order placed successfully!");
    } catch (error) {
      console.error("Failed to submit order:", error);
      alert("Something went wrong while placing the order.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-6 rounded-md space-y-4"
    >
      <h2 className="text-xl font-semibold">Checkout</h2>

      <FloatingLabelInput
        label="Shipping Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />

      <div className="relative">
        <select
          name="shipping"
          value={formData.shipping}
          onChange={handleChange}
          className="peer w-full px-4 py-3 pt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {shippingOptions.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name} (${option.price.toFixed(2)})
            </option>
          ))}
        </select>
        <label
          htmlFor="shipping"
          className="absolute left-4 top-1 text-gray-500 text-sm transition-all peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
        >
          Shipping Method
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Submit Order
      </button>
    </form>
  );
}
