"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import Badge from "./badge";
import { CartItemData } from "@/lib/types";
import { FaShoppingCart } from "react-icons/fa";
import Avatar from "./avater";
import { useCartData } from "@/hooks/CartHooks";
import { useSession, signOut } from "next-auth/react";
import { FiLogIn, FiLogOut } from "react-icons/fi";

export default function NavBar() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: cart } = useCartData(userId);

  const count = useMemo(
    () =>
      cart?.items?.reduce(
        (total: number, item: CartItemData) => total + item.stock,
        0
      ),
    [cart]
  );

  return (
    <nav className="w-full flex items-center justify-end gap-6">
      {!session && (
        <Link
          href="/login"
          className="flex text-purple-200 hover:text-white text-base font-medium"
        >
          <FiLogIn className="text-2xl text-purple-200 hover:text-white" />
          Login
        </Link>
      )}

      {session && (
        <>
          <Badge count={count}>
            <Link href="/cart">
              <FaShoppingCart className="text-2xl text-purple-200 hover:text-white cursor-pointer" />
            </Link>
          </Badge>

          <Avatar />

          <button
            onClick={() => signOut()}
            className="flex text-purple-200 hover:text-white text-base font-medium"
          >
            <FiLogOut className="text-2xl text-purple-200 hover:text-white" />
            Logout
          </button>
        </>
      )}
    </nav>
  );
}
