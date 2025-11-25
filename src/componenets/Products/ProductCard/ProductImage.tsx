import Image from 'next/image';
import { ProductBadges } from './ProductBadges';
import { ProductRating } from './ProductRating';

interface ProductImageProps {
  src: string;
  alt: string;
  discountPercentage: number;
  stock: number;
  rating?: number;
}

export function ProductImage({ src, alt, discountPercentage, stock, rating }: ProductImageProps) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg bg-gray-100">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      
      <ProductBadges discountPercentage={discountPercentage} stock={stock} />
      {rating && <ProductRating rating={rating} />}
    </div>
  );
}

