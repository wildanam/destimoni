import { useState } from "react"
import PlaceFinder from "../apis/PlaceFinder"

function UpdateReviewModal(props) {
    const [reviewData, setReviewData] = useState({
        name: props.name,
        placeId: props.placeId,
        review: props.review,
        rating: props.rating
    })

    function handleChange(event) {
        const {name, value} = event.target

        setReviewData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    async function handleUpdate() {
        await PlaceFinder.put(`/${props.reviewId}/updateReview`, {
            name: reviewData.name,
            place_id: reviewData.placeId,
            review: reviewData.review,
            rating: reviewData.rating
        })
        window.location.reload()
    }

    return (
        <div className="modal fade" id={`exampleModal${props.reviewId}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Update Review</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form action="">
                        <div className="row">
                            <div className="form-group col-8">
                                <label htmlFor="name">Name</label>
                                <input onChange={handleChange} value={reviewData.name} type="text" id="name" className="form-control" name="name" />
                            </div>
                            <div className="form-group col-4">
                                <label htmlFor="rating">Rating</label>
                                <select onChange={handleChange} value={reviewData.rating} name="rating" id="rating" className="form-select">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="review">Review</label>
                            <textarea onChange={handleChange} value={reviewData.review} id="review" name="review" className="form-control"></textarea>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button onClick={handleUpdate} type="submit" className="btn btn-primary" data-toggle="modal">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateReviewModal