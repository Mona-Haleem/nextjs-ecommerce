import ProductImageGallery from "@/componenets/product/ProductImageGallery";
import ProductInfo from "@/componenets/product/ProductInfoComponenet";
import ProductReviews from "@/componenets/product/ProductReviewComponenet";
import ProductSpecifications from "@/componenets/product/ProductSpecifications";
import { fetchProductById } from "@/lib/api/products";
import { Product } from "@/lib/types";


type ProductProps = {
  params: Promise<{ itemId: string }>;
};

export async function generateMetadata({ params }: ProductProps) {
  const { itemId } = await params;
  const product = await fetchProductById(Number(itemId));
  
  return {
    title: `${product.title} - FakeStore`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.thumbnail || product.image || product.images?.[0]],
    },
  };
}

const ProductPage = async ({ params }: ProductProps) => {
  const { itemId } = await params;
  const product: Product = await fetchProductById(Number(itemId));

  const productImages = product.images || (product.image ? [product.image] : []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductImageGallery
            images={productImages}
            title={product.title}
            thumbnail={product.thumbnail}
          />

          <ProductInfo product={product} />
        </div>

        <ProductSpecifications product={product} />

        {product.reviews && product.reviews.length > 0 && (
          <ProductReviews 
            reviews={product.reviews} 
            averageRating={product.rating} 
          />
        )}
      </div>
    </div>
  );
};

export default ProductPage;