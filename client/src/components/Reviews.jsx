import PlaceFinder from "../apis/PlaceFinder"
import StarRating from "./StarRating"
import UpdateReviewModal from "./UpdateReviewModal"

function Reviews(props) {
    async function handleDelete(reviewId) {
        try {
            const confirmResponse = confirm("Are you sure to delete this review?")
            if (confirmResponse) {
                await PlaceFinder.delete(`/${reviewId}/deleteReview`)
                window.location.reload()
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {props.reviews.map(review => {
                return (
                    <div className="card mb-3" key={review.id}>
                        <div className="card-body">
                            <h5 className="card-title">{review.name}</h5>
                            <p className="card-text"><StarRating rating={review.rating} /></p>
                            <p className="card-text">{review.review}</p>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p className="card-text"><small className="text-muted">{review.date}</small></p>
                                </div>
                                <div>
                                    <a className="card-link btn-edit" data-bs-toggle="modal" data-bs-target={`#exampleModal${review.id}`}>Update</a>
                                    <a onClick={() => handleDelete(review.id)} className="card-link btn-edit text-danger">Delete</a>
                                </div>
                            </div>
                        </div>
                        <UpdateReviewModal reviewId={review.id} name={review.name} placeId={review.place_id} review={review.review} rating={review.rating} />
                    </div>
                )
            })}
        </>
    )
}

export default Reviews