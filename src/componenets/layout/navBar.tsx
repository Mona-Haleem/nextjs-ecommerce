'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Badge from './badge'
import { useCart } from '@/hooks/useCart'
import { CartItemData } from '@/lib/types'
import { FaShoppingCart } from "react-icons/fa";
import Avatar from './avater'

const links =[
  {label:"Browse Products",path:'/products'},
  {label:"Shop By Categories",path:'/category'},
]
export default function NavBar() {
  const{cartItems} = useCart()
  const count = cartItems?.reduce((total:number,item:CartItemData)=>total + item.quantity,0)
  const pathname = usePathname();
  console.log(pathname) 
  return (
    <nav className='w-100 p-4 bgcolor-red'>
        <ul className='w-100 flex justify-around'>
          {
            links.map(ele =>(
              <li key={ele.path} className={`${pathname.includes(ele.path)?'text-white':'text-purple-200'} hover:text-amber-200`}>
                <Link href={ele.path} >{ele.label}</Link>
              </li>

            ))
          }
            <li className='text-purple-200 hover:text-amber-200'>
              <Badge count={count}>
                <Link href='/cart' ><FaShoppingCart className="text-2xl text-gray-200 cursor-pointer" /></Link>
              </Badge>
            </li>
            <li className='text-purple-200 hover:text-amber-200'>
              <Avatar/>
              </li>
        </ul>
    </nav>
  )
}
