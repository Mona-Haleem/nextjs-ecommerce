import { ProductReview } from "@/lib/types";

interface ProductReviewsProps {
  reviews: ProductReview[];
  averageRating: number;
}

export default function ProductReviews({ reviews, averageRating }: ProductReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: (reviews.filter(r => r.rating === star).length / reviews.length) * 100
  }));

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

      {/* Rating Summary */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="text-center md:text-left">
          <div className="flex items-baseline gap-2 justify-center md:justify-start">
            <span className="text-5xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-yellow-500 text-3xl">★</span>
          </div>
          <p className="text-gray-600 mt-2">Based on {reviews.length} reviews</p>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {ratingDistribution.map(({ star, count, percentage }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 w-12">
                {star} ★
              </span>
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-500 transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review, idx) => (
          <div key={idx} className="border-b pb-6 last:border-b-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">
                    {review.reviewerName}
                  </span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i}
                        className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
