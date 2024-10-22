import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews, fetchSpotDetails } from "../../store/spots";
import './SpotDetails.css';
import { RiStarSFill } from "react-icons/ri";
import { useModal } from "../../context/Modal"; 
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal";


function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const spot = useSelector((state) => state.spots.spotDetails);
    const reviews = useSelector((state) => state.spots.reviews);
    const sessionUser = useSelector((state) => state.session.user);
    const { openModal } = useModal();

    const [loaded, setLoaded] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [hasPostedReview, setHasPostedReview] = useState(false);
    const [ratingDisplay, setRatingDisplay] = useState('');
    const [reviewSummary, setReviewSummary] = useState('');

    // console.log("spotId from URL:", spotId);


    // useEffect(() => {
    //     dispatch(fetchSpotDetails(spotId)).then(() => setLoaded(true));
    //     dispatch(fetchReviews(spotId)).then(() => setLoaded(true));
    // }, [dispatch, spotId]); 

    useEffect(() => {
        const loadData = async () => {
            try {
                await dispatch(fetchSpotDetails(spotId));
                await dispatch(fetchReviews(spotId));
                setLoaded(true);
            } catch (error) {
                console.error("Error fetching spot details or reviews:", error);
                setLoaded(true);
            }
        };
        loadData();
    }, [dispatch, spotId]);

    
    useEffect(() => {
        if (spot) {
            console.log("\n == avgRating ==\n", spot.avgRating);
            setIsOwner(sessionUser?.id === spot.Owner?.id);
            setHasPostedReview(reviews.some(review => review.spotId == spot.id && review.userId === sessionUser?.id));
            setRatingDisplay(spot.avgRating ? `${spot.avgRating.toFixed(2)}` : 'New');
            setReviewSummary(spot.numReviews > 0
                ? ` · ${spot.numReviews} ${spot.numReviews === 1 ? 'review' : 'reviews'}`
                : "")
        }
    }, [reviews, sessionUser, spot])

    // useEffect(() => {
    //     if (spot) {
    //         setHasPostedReview(reviews.some(review => review.spotId === spot.id && review.userId === sessionUser?.id));
    //     }
    // }, [reviews])

    
    // if (!spot) return <p>En route...</p>

    // if (!loaded || !spot || Object.keys(spot).length === 0) {
    //     return <p>En route...</p>;
    // }
    
    // const { name, city, state, country, SpotImages, description, price, Owner, avgStarRating, numReviews } = spot;
    
    // const ratingDisplay = spot.avgRating ? `${spot.avgRating.toFixed(2)}` : 'New';

    // const reviewSummary = spot.numReviews > 0
    // ? `${ratingDisplay} · ${spot.numReviews} ${spot.numReviews === 1 ? 'review' : 'reviews'}`
    // : ratingDisplay;

    // const hasPostedReview = reviews.some(review => review.userId === sessionUser?.id);
    // const isOwner = sessionUser?.id === spot.Owner?.id;


    const handleReserveClick = () => {
        alert("Feature coming soon");
      };

    const handlePostReviewClick = () => {
        openModal(<ReviewFormModal spotId={spotId} />); 
    };

    return loaded ? (
    // return (
        <div className="spot-details-container">
            <h1>{spot.name}</h1>
            <p>{spot.city}, {spot.state}, {spot.country}</p>
            
            {/* images */}
            <div className="spot-images">
            <img className="large-image" src={spot.SpotImages.find(img => img.preview)?.url || spot.SpotImages[0].url} alt="Main spot" />
            <div className="small-images">
                {spot.SpotImages.filter(img => !img.preview).slice(0, 4).map((image, index) => (
                <img key={index} className="small-image" src={image.url} alt={`Image ${index + 1}`} />
                ))}
            </div>
            </div>

            {/* Hosted By and Description */}
            <div className="spot-callout-description">
            <div className="spot-hosted-description">
            <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
            <p>{spot.description}</p>
            </div>

            {/* Callout Box */}
            <div className="callout-box">
            <div className="callout-header">
                <div>

                <span className="price">${spot.price.toFixed(2)}</span> <span className="per-night">/ night</span>
                </div>
            <span className="rating-summary"><RiStarSFill className="first-star-icon"/> {ratingDisplay}{reviewSummary}
            </span>
            </div>
            <button className="reserve-button" onClick={handleReserveClick}>Reserve</button>
            </div>
            </div>
            <hr />


            {/* Reviews */}
            <div className="reviews-section">
            <h2><RiStarSFill className="star-icon"/>{ratingDisplay}{reviewSummary}</h2>
                {/* Post Review Button */}
            {(sessionUser && !isOwner && !hasPostedReview) && (
                <button className="post-review-button" onClick={handlePostReviewClick}>
                    Post Your Review
                </button>
            )}
            {reviews.filter((review) => review.spotId == spot.id).length > 0 ? (
                <ul className="review-bricks">
                {[...reviews].reverse().map((review) => review.spotId == spot.id && (
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
    // )
    ) : <p>En route...</p>
}

export default SpotDetails;
