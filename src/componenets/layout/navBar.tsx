"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo, useState } from "react";
import Badge from "./badge";
import { CartItemData } from "@/lib/types";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import Avatar from "./avater";
import { useCartData } from "@/hooks/CartHooks";
import { useSession } from "next-auth/react";

const links = [
  { label: "Browse Products", path: "/products" },
  { label: "Shop By Categories", path: "/category" },
];

export default function NavBar() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data: cart } = useCartData(userId);

  const count = useMemo(
    () => cart?.items?.reduce((total: number, item: CartItemData) => total + item.stock, 0),
    [cart]
  );

  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative">
      {/* Mobile Button */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      {/* Desktop + Mobile Menu */}
      <ul
        className={`flex flex-col md:flex-row md:items-center gap-6 md:gap-10 
        absolute md:static right-0 top-12 md:top-0 
        bg-blue-600 md:bg-transparent shadow-md md:shadow-none 
        px-6 py-4 md:p-0 rounded-lg transition-all 
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"}`}
      >
        {links.map((link) => (
          <li key={link.path}>
            <Link
              href={link.path}
              className={`text-base font-medium transition 
              ${pathname.includes(link.path) ? "text-white" : "text-purple-200 hover:text-white"}
              `}
            >
              {link.label}
            </Link>
          </li>
        ))}

        {/* Cart */}
        <li className="text-purple-200 hover:text-white">
          <Badge count={count}>
            <Link href="/cart">
              <FaShoppingCart className="text-2xl cursor-pointer" />
            </Link>
          </Badge>
        </li>

        {/* Avatar */}
        <li className="text-purple-200 hover:text-white">
          <Avatar />
        </li>
      </ul>
    </nav>
  );
}
