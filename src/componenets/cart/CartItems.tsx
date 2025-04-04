'use client'
import { CartItemData } from '@/lib/types'
import React from 'react'
import CartItem from './CartItem'
import { useCart } from '@/hooks/useCart';
import ShippingOptions from './ShippingOptions';
import CartTotal from './CartTotal';


export default function CartItems() {
  
  const { cartItems } = useCart();

   
  return (
    <>
     <div className="space-y-4">
          {cartItems?.map((item: CartItemData) => (<CartItem key={item.id} item={item} /> ))}
    </div>
    <CartTotal cartItems={cartItems} />
    <ShippingOptions cartItems={cartItems}/>
    </>
  )
}
