import { AiFillStar } from 'react-icons/ai';

interface ProductRatingProps {
  rating: number;
}

export function ProductRating({ rating }: ProductRatingProps) {
  return (
    <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded shadow flex items-center gap-1">
      <AiFillStar size={12} className="text-yellow-400" />
      <span className="text-xs font-semibold">{rating.toFixed(1)}</span>
    </div>
  );
}