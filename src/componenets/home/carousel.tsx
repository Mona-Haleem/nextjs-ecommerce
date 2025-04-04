'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface props{
    images:string[];
}
export default function Carousel({images}:props) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex:number) =>
          prevIndex < images.length - 1 ? prevIndex + 1 : 0
        );
      }, 5000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="relative h-[400px] w-1/2 border p-5 rounded-lg shadow-inner overflow-hidden">     
            <div className="absolute inset-0 bg-black/20 w-full h-full z-10"></div>
          <Image
            src={images[currentImageIndex]}
            className=""
            fill
            alt="carosel Image"
          />
      </div>
    );
}
