import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSpot } from '../../store/spots';
import { useDispatch } from "react-redux";

function CreateSpotForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [country, setCountry] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [previewImageUrl, setPreviewImageUrl] = useState("");
    const [imageUrls, setImageUrls] = useState(["", "", "", ""]);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSpot = {
            country,
            streetAddress,
            city,
            state,
            description,
            name,
            price,
            previewImageUrl,
            imageUrls,
        };

        const createdSpot = await dispatch(createSpot(newSpot)); 

        if (createdSpot) {
            navigate(`/spots/${createdSpot.id}`);
        }
    };

    return (
        <form action=""></form>
    )
}

export default CreateSpotForm;