"use client";

import { Product } from "@/lib/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FiTrash2, FiLoader } from "react-icons/fi";
import QuantitySelector from "./QuantitySelector";
import { memo } from "react";
import { toast } from "sonner";
import { useCartActions } from "@/hooks/CartHooks";
import Link from "next/link";

interface CartItemCardProps {
  item: Product;
}

// Memoize to prevent re-renders when other cart items update
const CartItemCard = memo(
  function CartItemCard({ item }: CartItemCardProps) {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const discountedPrice = item.price * (1 - item.discountPercentage / 100);

    const { updateQuantity, removeFromCart, isUpdating } = useCartActions(
      userId,
      {
        onSuccess: (action) => {
          if (action === "update") {
            toast.success("Quantity updated");
          } else if (action === "remove") {
            toast.success("Item removed");
          }
        },
        onError: () => {
          toast.error("Failed to update cart");
        },
      }
    );

    const handleQuantityChange = async (newQuantity: number) => {
      await updateQuantity(item.id, newQuantity);
    };

    const handleRemove = async () => {
      if (confirm(`Remove ${item.title} from cart?`)) {
        await removeFromCart(item.id);
      }
    };

    const itemTotal = discountedPrice * item.stock;

    return (
      <div className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
        <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
          <Image
            src={item.thumbnail || "/placeholder.png"}
            alt={item.title}
            fill
            className="object-contain p-2"
            sizes="96px"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <Link
              href={`/products/${item.id}`}
              className="font-semibold text-gray-900 line-clamp-2"
            >
              {item.title}
            </Link>
            <p className="text-sm text-gray-600 mt-1">
              ${item.price.toFixed(2)} each
            </p>
            {item.discountPercentage > 0 && (
              <span className="px-2 py-1 text-red-500 text-xs ">
                -{item.discountPercentage.toFixed(2)}% OFF
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-2">
            <QuantitySelector
              min={1}
              max={99}
              initialValue={item.stock}
              onChange={handleQuantityChange}
              disabled={isUpdating}
              size="sm"
            />

          </div>
        </div>

        <div className="flex flex-col ml-3 min-w-12 items-end justify-between">
         <div>

          <p className="text-lg font-bold text-gray-900">
            ${itemTotal.toFixed(2)}
          </p>

          <p className="text-xs text-gray-500">
            {item.stock} {item.stock === 1 ? "item" : "items"}
          </p>

         </div>
          
            <button
              onClick={handleRemove}
              disabled={isUpdating}
              className="flex items-center relative bottom-1 gap-1 text-sm text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <FiLoader className="w-4 h-4 animate-spin" />
              ) : (
                <FiTrash2 className="w-4 h-4" />
              )}
              Remove
            </button>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison - only re-render if item actually changed
    return (
      prevProps.item.id === nextProps.item.id &&
      prevProps.item.stock === nextProps.item.stock &&
      prevProps.item.price === nextProps.item.price
    );
  }
);

export default CartItemCard;
