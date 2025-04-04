import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import AddToCartButton from './addToCartBtn';

interface ProductCardProps {
    product:Product;
  };
  
  const ProductCard = ({ product }: ProductCardProps) => {
    return (
      <Link href={`/products/${product.id}`} className="border border-gray-300 rounded p-2 bg-gray-200 min-w-50">
        <div className="rounded p-2 relative aspect-[3/4]">
            <Image
            src={product.image}
            alt={product.title}
            fill
            className='object-cover'  
            />        
        </div>
        <h2 className="text-sm font-bold mt-2 text-black">{product.title}</h2>
        <p className="text-xs text-gray-600">{product.category}</p>
        <p className="text-green-600 font-semibold">${product.price}</p>
        <AddToCartButton product={product}/>
      </Link>
    );
  };
  
  export default ProductCard;
  