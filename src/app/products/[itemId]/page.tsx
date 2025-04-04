import AddToCartButton from '@/componenets/addToCartBtn';
import axios from 'axios';
import Image from 'next/image';

type ProductProps = {
  params: Promise<{ itemId: number }>;
};

export async function generateMetadata({ params }: ProductProps){
  const { itemId } = await params;
  const { data: product } = await axios.get(`https://fakestoreapi.com/products/${itemId}`);
  return {
    title: `${product.title} - FakeStore`,
   };
}

const ProductPage = async ({ params }: ProductProps) => {
  const { itemId } = await params;

  const { data: product } = await axios.get(`https://fakestoreapi.com/products/${itemId}`);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-full md:w-1/2 aspect-[4/5]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain bg-white p-2"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold text-black">{product.title}</h1>
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="text-lg text-purple-600 font-semibold"><b>Price: </b>${product.price}</p>
          <p className="text-black font-bold text-lg">Description: </p>
          <p className="text-gray-700 ml-5"> {product.description}</p>
         <AddToCartButton product={product}/>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;



