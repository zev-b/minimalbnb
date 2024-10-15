import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSpotDetails } from "../../store/spots";
import './SpotDetails.css';

function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.spotDetails);

    console.log("spotId from URL:", spotId);

    useEffect(() => {
        dispatch(fetchSpotDetails(spotId));
    }, [dispatch, spotId]);

    if (!spot) return <p>En route...</p>

    const { name, city, state, country, SpotImages, description, price, Owner, avgStarRating, numReviews, Reviews = [] } = spot;

    const ratingDisplay = avgStarRating ? `★ ${avgStarRating.toFixed(1)}` : 'New';
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
            <img className="large-image" src={SpotImages[0]?.url || '/placeholder.png'} alt="Main spot" />
            <div className="small-images">
                {SpotImages.slice(1, 5).map((image, index) => (
                <img key={index} className="small-image" src={image.url || '/placeholder.png'} alt={`Image ${index + 1}`} />
                ))}
            </div>
            </div>

            {/* Hosted By and Description */}
            <div className="spot-hosted-description">
            <h2>Hosted by {Owner.firstName} {Owner.lastName}</h2>
            <p>{description}</p>
            </div>

            {/* Callout Box (Price, Rating, Reserve Button) */}
            <div className="callout-box">
            <div className="callout-header">
                <span className="price">${price}</span> <span className="per-night">/ night</span>
            </div>
            <div className="rating-summary">{reviewSummary}</div>
            <button className="reserve-button" onClick={handleReserveClick}>Reserve</button>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
            <h2>{reviewSummary}</h2>
            {Reviews.length > 0 ? (
                <ul>
                {Reviews.map((review) => (
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
