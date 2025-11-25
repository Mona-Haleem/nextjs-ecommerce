import Link from "next/link";
import Carousel from "./carousel";

interface HeroSectionProps {
  images: string[];
}

export default function HeroSection({ images }: HeroSectionProps) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
      <div className="w-full lg:w-1/2">
        <Carousel images={images} />
      </div>

      <section className="w-full lg:w-1/2 text-center lg:text-left space-y-5">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug">
          Welcome to <span className="text-blue-600">FakeStore</span>
        </h1>

        <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto lg:mx-0">
          Find the best deals across fashion, electronics, accessories, and
          more.
        </p>

        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium 
            hover:bg-blue-700 transition"
        >
          View All Products
        </Link>
        <Link
          href="/category"
          className="inline-block mx-5 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium 
            hover:bg-blue-700 hover:text-white transition"
        >
          Browse Categories
        </Link>
      </section>
    </div>
  );
}
