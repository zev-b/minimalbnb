import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSpotImagesThunk, createSpotThunk, fetchSpotDetails, updateSpotThunk } from '../../store/spots';
import { useDispatch, useSelector } from "react-redux";
import './CreateSpotPage.css'

function CreateSpotPage({ manage }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { spotId } = useParams();

    const userId = useSelector(state => state.session.user?.id);
    const spotDetails = useSelector(state => state.spots.spotDetails);

    const [country, setCountry] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("")
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [previewImageUrl, setPreviewImageUrl] = useState("");
    const [imageUrls, setImageUrls] = useState(["", "", "", ""]);
    const [errors, setErrors] = useState({ imageUrls: [] });

    useEffect(() => {
        dispatch(fetchSpotDetails(spotId));            
    }, [dispatch]);

    useEffect(() => {
        if (spotId) {
            // console.log("\n===== spotId ====\n", spotId)
            if (spotDetails && Object.values(spotDetails).length) {
              setCountry(spotDetails.country);
              setStreetAddress(spotDetails.address);
              setCity(spotDetails.city);
              setState(spotDetails.state);
              setLatitude(spotDetails.lat);
              setLongitude(spotDetails.lng);
              setDescription(spotDetails.description);
              setName(spotDetails.name);
              setPrice(spotDetails.price);
            }
        } else {
            setCountry("");
            setStreetAddress("");
            setCity("");
            setState("");
            setLatitude("");
            setLongitude("");
            setDescription("");
            setName("");
            setPrice("");
        }
    }, [spotDetails, spotId])

    useEffect(() => {

    }, [errors])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validations = { imageUrls: [] };

        if (!country) validations.country = "Country is required";
        if (!streetAddress) validations.streetAddress = "Street address is required";
        if (!city) validations.city = "City is required";
        if (!state) validations.state = "State is required";
        if (!latitude) validations.latitude = "Latitude is required";
        if (Number.isNaN(parseFloat(latitude)) || latitude > 90 || latitude < -90) validations.latitude = 'Latitude must be within -90 and 90';
        if (!longitude) validations.longitude = "Longitude is required";
        if (Number.isNaN(parseFloat(longitude)) || longitude > 180 || longitude < -180) validations.longitude = 'Longitude must be within -180 and 180';
        if (description.length < 30) validations.description = "Description needs a minimum of 30 characters";
        if (!name) validations.name = "Name is required";
        if (!price) validations.price = "Price is required";
        if (price < 1) validations.price = 'Price per day must be a positive number';

        if (!manage) {
            if (!previewImageUrl) validations.previewImageUrl = "Preview image is required";
    
            const validUrl = /\.(?:png|jpg|jpeg)$/i;
            if (!validUrl.test(previewImageUrl)) {
                validations.previewImageUrl = "Preview Image URL needs to end in .png, .jpg, or .jpeg";
            }
    
            imageUrls.forEach((url, index) => {
                if (url && !validUrl.test(url)) {
                    validations.imageUrls[index] = `Image URL needs to end in .png, .jpg, or .jpeg`;
                }
            });
        }

        setErrors(validations);

        if (Object.entries(validations).length !== 1 || validations.imageUrls.length !== 0) {
            return;
        }

        const newSpot = {
            ownerId: userId,
            country,
            address: streetAddress,
            city,
            state,
            description,
            name,
            price,
            lng: longitude,
            lat: latitude,
            // previewImageUrl,
            // imageUrls,
        };

        let createdSpot;

        if (!manage) {
            try {
                createdSpot = await dispatch(createSpotThunk(newSpot)); 
            } catch (res) {
                return setErrors((await res.json()).errors);
            }
            
            const imagesToSend = [{ url: previewImageUrl, preview: true }];

            imageUrls.forEach((url) => {
            if (url) {
                imagesToSend.push({ url, preview: false });
            }
            });
            
            dispatch(createSpotImagesThunk(imagesToSend, createdSpot.id));
        } else {
            newSpot.id = spotId;

            try {
                createdSpot = await dispatch(updateSpotThunk(newSpot));
            } catch (res) {
                // const errorMessages = (await res.json()).errors;
                // console.log(errorMessages)
                return setErrors((await res.json()).errors);
            }
        }

        navigate(`/spots/${createdSpot.id}`);
    };


    return (
        <form className="create-spot-form" onSubmit={handleSubmit}>
            <h1>{spotId ? 'Update your' : 'Create a New'} Spot</h1>

             {/* Location Section */}
             <section>
                <h3>Where&apos;s your place located?</h3>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <label>
                  Country
                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
                </label>
                {errors.country && <p className="error">{errors.country}</p>}
                <label>
                  Street Address
                <input
                    type="text"
                    placeholder="Street Address"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    required
                />
                </label>
                {(errors.streetAddress || errors.address) && <p className="error">{errors.streetAddress || errors.address}</p>}
                <label>
                    City
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    />
                    </label>   
                {errors.city && <p className="error">{errors.city}</p>}
                <label>
                State
                <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    />
                    </label>
                {errors.state && <p className="error">{errors.state}</p>}
                <label>
                    Latitude
                <input
                    type="text"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    required
                    />
                    </label>
                    {(errors.latitude || errors.lat) && <p className="error">{errors.latitude || errors.lat}</p>}
                <label>
                  Longitude
                <input
                    type="text"
                    placeholder="Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)} 
                    required
                    />
                    </label>
                    {(errors.longitude || errors.lng) && <p className="error">{errors.longitude || errors.lng}</p>}
            </section>

            <hr />

            {/* Description Section */}
            <section>
                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea
                    placeholder="Please write at least 30 characters"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                {errors.description && <p className="error">{errors.description}</p>}
            </section>

            <hr />
            
            {/* Title Section */}
            <section>
                <h3>Create a title for your spot</h3>
                <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                <input
                    type="text"
                    placeholder="Name of your spot"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                {errors.name && <p className="error">{errors.name}</p>}
            </section>

            <hr />
            
            {/* Price Section */}
            <section>
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                $<input
                    type="number"
                    placeholder="Price per night (USD)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                {errors.price && <p className="error">{errors.price}</p>}
            </section>

            <hr />

            {/* Image URL Section */}
            {!manage &&  (
                <>
                <section className={manage? "hidden" : ""}>
                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <input
                    type="text"
                    placeholder="Preview Image URL"
                    value={previewImageUrl}
                    onChange={(e) => setPreviewImageUrl(e.target.value)}
                    required={!manage}
                />
                {errors.previewImageUrl && <p className="error">{errors.previewImageUrl}</p>}
                
                {imageUrls.map((url, idx) => (
                    <div key={idx}>
                        <input
                            type="text"
                            placeholder={`Image URL`}
                            value={imageUrls[idx]}
                            onChange={(e) => {
                                const newImageUrls = [...imageUrls];
                                newImageUrls[idx] = e.target.value;
                                setImageUrls(newImageUrls);
                            }}
                        />
                        {errors.imageUrls?.[idx] && <p className="error">{errors.imageUrls[idx]}</p>}
                    </div>
                ))}
            </section>

            <hr />
            </>
                )
            }

            {/* Submit Button */}
            <button type="submit">{spotId ? 'Update your' : 'Create'} Spot</button>
        </form>
    )
}

export default CreateSpotPage;