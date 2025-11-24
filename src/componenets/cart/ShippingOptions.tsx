"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import axios from "axios";
import FloatingLabelInput from "../profile/Input";
import { Product } from "@/lib/types";
import { SERVER_URL } from "@/lib/db";

export default function CheckoutForm() {
  const { data: session } = useSession();
  const { cartItems, updateCart } = useCart();

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

    if (!session?.user?.id || !cartItems) {
      alert("You must be logged in and have items in your cart.");
      return;
    }

    const selectedShipping = shippingOptions.find(
      (option) => option.name === formData.shipping
    );

    const shippingCost = selectedShipping?.price || 0;
    const itemsTotal = cartItems.items.reduce(
      (sum:number, item:Product & {quantity : number}) => sum + item.price * item.quantity,
      0
    );

    const totalPrice = itemsTotal + shippingCost;

    const newOrder = {
      userId: session.user.id,
      items: cartItems.items,
      totalPrice,
      address: formData.address,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    };

    try {
      await axios.post(`${SERVER_URL}/api/orders`, newOrder);
      
      await axios.put(`${SERVER_URL}/api/cart/${cartItems.id}`, {
        userId: session.user.id,
        items: [],
      });

      updateCart.mutate([]); 

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
