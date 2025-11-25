"use client";
import { Product } from "@/lib/types";
import React from "react";
import CartItem from "./CartItem";
import ShippingOptions from "./ShippingOptions";
import CartTotal from "./CartTotal";
import { useCartData } from "@/hooks/CartHooks";
import { useSession } from "next-auth/react";

export default function CartItems() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data: cart } = useCartData(userId);

  return (
    <>
      <div className="space-y-4">
        {cart?.items?.map((item: Product) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <CartTotal cartItems={cart?.items} />
      <ShippingOptions />
    </>
  );
}
