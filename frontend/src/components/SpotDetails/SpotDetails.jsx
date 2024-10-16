import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews, fetchSpotDetails } from "../../store/spots";
import './SpotDetails.css';
import { RiStarSFill } from "react-icons/ri";

function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.spotDetails);
    const reviews = useSelector((state) => state.spots.reviews)

    // console.log("spotId from URL:", spotId);

    useEffect(() => {
        dispatch(fetchSpotDetails(spotId));
        dispatch(fetchReviews(spotId));
    }, [dispatch, spotId]);


    if (!spot) return <p>En route...</p>

    const { name, city, state, country, SpotImages, description, price, Owner, avgStarRating, numReviews } = spot;

    const ratingDisplay = avgStarRating ? `${avgStarRating.toFixed(2)}` : 'New';

    const reviewSummary = numReviews > 0
    ? `${ratingDisplay} · ${numReviews} ${numReviews === 1 ? 'Review' : 'Reviews'}`
    : ratingDisplay;

    const handleReserveClick = () => {
        alert("Feature coming soon");
      };

    return (
        <div className="spot-details-container">
            <h1>{name}</h1>
            <p>{city}, {state}, {country}</p>
            
            {/* Images Section */}
            <div className="spot-images">
            <img className="large-image" src={SpotImages.find(img => img.preview)?.url || SpotImages[0].url} alt="Main spot" />
            <div className="small-images">
                {SpotImages.filter(img => !img.preview).slice(0, 4).map((image, index) => (
                <img key={index} className="small-image" src={image.url} alt={`Image ${index + 1}`} />
                ))}
            </div>
            </div>

            {/* Hosted By and Description */}
            <div className="spot-hosted-description">
            <h2>Hosted by {Owner.firstName} {Owner.lastName}</h2>
            <p>{description}</p>
            </div>

            {/* Callout Box (price, rating, reserve Button) */}
            <div className="callout-box">
            <div className="callout-header">
                <span className="price">${price.toFixed(2)}</span> <span className="per-night">/ night</span>
            </div>
            <div className="rating-summary"><RiStarSFill className="first-star-icon"/> {reviewSummary}</div>
            <button className="reserve-button" onClick={handleReserveClick}>Reserve</button>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
            <h2><RiStarSFill className="star-icon"/>{reviewSummary}</h2>
            {reviews.length > 0 ? (
                <ul>
                {reviews.map((review) => (
                    <li key={review.id} className="review-item">
                    <h3>{review.User.firstName}</h3>
                    <p>{new Date(review.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                    <p>{review.review}</p>
                    </li>
                ))}
                </ul>
            ) : (
                <p>Be the first to post a review!</p>
            )}
            </div>
        </div>
    );
}

export default SpotDetails;
