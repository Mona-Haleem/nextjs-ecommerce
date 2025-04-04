import CartItems from '@/componenets/cart/CartItems'
import React from 'react'

export default function Cart() {
  return (
    <main className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <CartItems />
  </main>
  )
}
