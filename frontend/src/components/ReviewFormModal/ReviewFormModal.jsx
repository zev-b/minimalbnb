// frontend/src/components/ReviewFormModal/ReviewFormModal.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createReviewThunk } from "../../store/spots";
import { useModal } from "../../context/Modal";

import './ReviewFormModal.css';
import { FaRegStar } from "react-icons/fa6";


const ReviewFormModal = ({ spotId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
  
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});
    const [hover, setHover] = useState(0);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (review.length < 10) {
        setErrors({ review: "Review must be at least 10 characters long" });
        return;
      }
      if (stars === 0) {
        setErrors({ stars: "Please select a star rating" });
        return;
      }

    //   console.log({ spotId, review, stars });
  
      const newReview = await dispatch(createReviewThunk(spotId, { review, stars }));
      if (newReview) {
        closeModal(); 
      } else {
        setErrors({ server: "An error occurred while submitting the review." });
      }
    };
  
    return (
      <div className="review-form-modal">
        <h2>How was your stay?</h2>
        {errors.review && <p className="error">{errors.review}</p>}
        <textarea
          placeholder="Leave your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
  
        {errors.stars && <p className="error">{errors.stars}</p>}
        <label>Stars</label>
        {/* <input
          type="number"
          min="1"
          max="5"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
        /> */}
        <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
            <label key={star}>
            <input
                type="radio"
                name="rating"
                value={star}
                checked={stars === star}
                onChange={() => {}}
                onClick={() => setStars(star)} // Handle clicking to set the star rating
                style={{ display: 'none' }} // Hide the actual radio buttons
            />
            <FaRegStar
                className={`star-icon ${star <= (hover || stars) ? 'filled' : ''}`} // Apply filled class when needed
                onMouseEnter={() => setHover(star)} // Handle hover
                onMouseLeave={() => setHover(0)} // Remove hover
            />
            </label>
        ))}
        </div>
        
        <button 
          type="submit"
          onClick={handleSubmit}
          disabled={review.length < 10 || stars === 0}
        >
          Submit Your Review
        </button>
      </div>
    );
}
  
export default ReviewFormModal;