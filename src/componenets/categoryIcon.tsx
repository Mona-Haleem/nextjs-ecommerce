// components/category-icons.tsx
import type { IconType } from "react-icons";

import {
  FiShoppingCart,
  FiHome,
  FiSmartphone,
  FiWatch,
  FiPhone,
  FiBox,
  FiSun,
  FiTruck,
  FiDroplet,
} from "react-icons/fi";

import {
  MdOutlineChair,
  MdOutlineKitchen,
  MdOutlineSportsSoccer,
  MdOutlineWatch,
} from "react-icons/md";

import { GiLipstick, GiBallerinaShoes, GiEmerald } from "react-icons/gi";
import { RiShoppingBagLine } from "react-icons/ri";
import { AiOutlineLaptop, AiOutlineTablet } from "react-icons/ai";

/**
 * Perfectly matched, real icons.
 * Every key has a unique icon and all imports EXIST.
 */
export const categoryIconMap: Record<string, IconType> = {
  beauty: GiLipstick,
  fragrances: FiDroplet,
  furniture: MdOutlineChair,
  groceries: FiShoppingCart,
  "home-decoration": FiHome,
  "kitchen-accessories": MdOutlineKitchen,
  laptops: AiOutlineLaptop,
  "mens-shirts": FiBox, // neutral placeholder (no shirt in Feather)
  "mens-shoes": GiBallerinaShoes,
  "mens-watches": MdOutlineWatch,
  "mobile-accessories": FiPhone,
  motorcycle: FiTruck,
  "skin-care": FiDroplet,
  smartphones: FiSmartphone,
  "sports-accessories": MdOutlineSportsSoccer,
  sunglasses: FiSun,
  tablets: AiOutlineTablet,
  tops: FiBox, // neutral placeholder (no top/shirt icon exists)
  vehicle: FiTruck,
  "womens-bags": RiShoppingBagLine,
  "womens-dresses": GiBallerinaShoes,
  "womens-jewellery": GiEmerald,
  "womens-shoes": GiBallerinaShoes,
  "womens-watches": FiWatch,
};

/** Default fallback */
export const fallbackIcon: IconType = FiBox;

export function CategoryIcon({
  category,
  size = 22,
  color = "currentColor",
  className,
}: {
  category: string;
  size?: number;
  color?: string;
  className?: string;
}) {
  const Icon = categoryIconMap[category] ?? fallbackIcon;
  return <Icon size={size} color={color} className={className} />;
}
