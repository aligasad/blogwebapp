import { useEffect, useState } from "react";
import { addReview, getReviews } from "../../firebase/reviewServices";
import { getAuth } from "firebase/auth";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function ReviewSection({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const fetchData = async () => {
    const data = await getReviews(productId.id);
    setReviews(data);
  };

  useEffect(() => {
    fetchData();
  }, [productId.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in to write a review.");
      return;
    }

    await addReview(productId.id, {
      userId: user.uid,
      userName: user.email || "Anonymous",
      rating: Number(rating),
      comment,
    });

    setRating(0);
    setComment("");
    fetchData();
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const renderStars = (avg) => {
    const fullStars = Math.floor(avg);
    const hasHalf = avg - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
      <div className="flex items-center text-yellow-500 text-xl mb-2">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {hasHalf && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
      </div>
    );
  };

  const avgRating = getAverageRating();

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="text-xl font-bold mb-2">Reviews</h3>

      {reviews.length > 0 && (
        <div className="mb-3 flex items-center gap-2 border-b-2">
          {renderStars(avgRating)}
          <span className="text-gray-700 font-medium text-lg mb-2">
            {avgRating} Rating <span className="text-[14px]">({reviews.length} reviews)</span>
          </span>
        </div>
      )}

      {reviews.length === 0 && <p>No reviews yet. Be the first!</p>}

      {/* Scrollable reviews container */}
      <div className="max-h-64 overflow-y-auto scrollbar-hide pr-1 space-y-4 relative">
        
  {reviews.map((r) => (
    <div
      key={r.id}
      className="bg-yellow-50 border border-yellow-200 rounded-xl py-2 px-4 shadow-sm"
    >
      <p >
        <span className="font-semibold text-yellow-800">Review:</span>{" "}
        <span className="text-gray-800 text-[14px]">{r.comment}</span>
      </p>
      <p className="text-[12px]">{r.userName}</p>
    </div>
  ))}
</div>


      <hr className="my-4" />
      <h4 className="font-semibold">Leave a Review</h4>
      <form onSubmit={handleSubmit} className="space-y-2">
  <input
    type="number"
    required
    placeholder="Rating (1-5)"
    value={rating}
    onChange={(e) => setRating(e.target.value)}
    className="border border-gray-300 focus:border-[#003d29] focus:ring-1 focus:ring-[#003d29] rounded-md p-2 w-full transition duration-200 outline-none"
    min="1"
    max="5"
  />
  <textarea
    placeholder="Write your comment"
    required
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    className="border border-gray-300 focus:border-[#003d29] focus:ring-1 focus:ring-[#003d29] rounded-md p-2 w-full transition duration-200 outline-none"
    rows="3"
  />
  <button
    type="submit"
    className="bg-[#376a55] cursor-pointer hover:bg-[#003d29] transition duration-200 text-white px-4 py-2 rounded-md w-full font-semibold shadow-sm"
  >
    Submit Review
  </button>
</form>

    </div>
  );
}

export default ReviewSection;
// This component allows users to view and submit reviews for a product.
// It fetches reviews from Firebase, displays them, and allows authenticated users to add new reviews.