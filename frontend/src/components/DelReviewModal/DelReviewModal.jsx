import { useState } from "react"
import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/spots";
import { useModal } from "../../context/Modal";







const DelReviewModal = ({ reviewId }) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        try {
            await dispatch(deleteReviewThunk(reviewId));
            closeModal();
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="delete-modal">
      <div className="modal-content">
        <h2>Confirm Delete</h2>
        {error && (<p>{error}</p>)}
        <p>Are you sure you want to delete this review?</p>
        <div className="modal-buttons">
          <button className="delete-button-yes" onClick={handleDelete}>
            Yes (Delete Review)
          </button>
          <button className="cancel-button" onClick={closeModal}>
            No (Keep Review)
          </button>
        </div>
      </div>
    </div>
    )
}

export default DelReviewModal;