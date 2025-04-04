"use client";

import { CartItemData } from "@/lib/types";
import QuantityAdjust from "./QuantitySelector";
import ItemRemoval from "./RemoveItemButton";

interface CartItemProps{
    item:CartItemData;
}
export default function CartItem({item}:CartItemProps) {
  

  return (
    
        <div className="flex items-center space-x-4 p-4 border-b">
          <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
          <div className="flex-grow">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-gray-500">${item.price}</p>
            <div className="flex items-center space-x-4">
             <QuantityAdjust item={item}/>
             <ItemRemoval itemId={item.id}/>
            </div>
          </div>
        </div>
     
  );
}
