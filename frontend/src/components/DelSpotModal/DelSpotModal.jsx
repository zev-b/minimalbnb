import { useState } from "react"
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";


const DelSpotModal = ({ spotId }) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        try {
            await dispatch(deleteSpotThunk(spotId));
            closeModal();
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="delete-modal">
      <div className="modal-content">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this spot?</p>
        <div className="modal-buttons">
          <button className="delete-button" onClick={handleDelete}>
            Yes (Delete Spot)
          </button>
          <button className="cancel-button" onClick={closeModal}>
            No (Keep Spot)
          </button>
        </div>
      </div>
    </div>
    )
}

export default DelSpotModal;