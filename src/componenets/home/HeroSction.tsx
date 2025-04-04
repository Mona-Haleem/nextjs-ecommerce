import Link from 'next/link';
import Carousel from './carousel';

interface HeroSectionProps {
  images: string[];
}

export default function HeroSection({ images }: HeroSectionProps) {
  return (
    <div className='flex items-center justify-between'>
      <Carousel images={images} />
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to FakeStore</h1>
        <p className="text-gray-600">Find the best products in fashion, electronics, and more!</p>
        <Link
          href="/categories"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Browse Categories
        </Link>
      </section>
    </div>
  );
}
