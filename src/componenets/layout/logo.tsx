import React from 'react'
import logo from "@/assets/logo.png"
import Image from 'next/image'
import Link from 'next/link'
export default function Logo() {
  return (
        <Link href="/" className="flex items-center gap-3">
      <Image
        src={logo}
        alt="FakeStore Logo"
        height={45}
        width={45}
        className="rounded-md"
      />
      <h1 className="text-xl font-semibold tracking-wide">FakeStore</h1>
    </Link>

  )
}
