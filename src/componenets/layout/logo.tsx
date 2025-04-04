import React from 'react'
import logo from "@/assets/logo.png"
import Image from 'next/image'
import Link from 'next/link'
export default function Logo() {
  return (
    <Link href="/" className='flex items-center gap-5'>
        <Image src={logo} alt='shopping page logo' height={50}/>
        <h1 className='text-xl'>FakeStore</h1>
    </Link>
  )
}
