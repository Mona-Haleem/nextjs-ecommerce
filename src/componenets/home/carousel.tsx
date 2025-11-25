'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Props {
  images: string[];
}

export default function Carousel({ images }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev =>
        prev < images.length - 1 ? prev + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative rounded-xl shadow-lg overflow-hidden w-full h-[250px] sm:h-[320px] md:h-[380px] lg:h-[400px] bg-gray-200">
      
      <div className="absolute inset-0 bg-black/20 z-10"></div>

      <Image
        src={images[currentImageIndex]}
        alt="carousel image"
        fill
        priority
        className="object-cover transition-opacity duration-700"
      />
    </div>
  );
}
