import type { Product } from "../../types/types";

type ReviewCardProps = {
    produto: Product;
};

const ProductReviews = ({ produto }: ReviewCardProps) => {
    return(
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">Reviews & Ratings</h2>
          <div className="space-y-4">
            {produto.reviews.slice(0, 3).map((review, idx) => (
              <div key={idx} className="border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">{review.reviewerName}</h3>
                  <span className="text-yellow-500">⭐ {review.rating}</span>
                </div>
                <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                <p className="text-sm mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
    );
};

export default ProductReviews;