'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductImageGalleryProps {
  images: string[];
  title: string;
  thumbnail?: string;
}

export default function ProductImageGallery({ 
  images, 
  title, 
  thumbnail 
}: ProductImageGalleryProps) {
  const allImages = thumbnail ? [thumbnail, ...images] : images;
  const [selectedImage, setSelectedImage] = useState(allImages[0] || '');

  if (!allImages.length) {
    return (
      <div className="relative w-full aspect-[4/5] bg-gray-100 flex items-center justify-center">
        <p className="text-gray-400">No image available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative w-full aspect-[4/5] bg-white rounded-lg overflow-hidden">
        <Image
          src={selectedImage}
          alt={title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnail Gallery */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                selectedImage === img
                  ? 'border-purple-600 ring-2 ring-purple-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={img}
                alt={`${title} view ${idx + 1}`}
                fill
                className="object-contain p-1 bg-white"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}