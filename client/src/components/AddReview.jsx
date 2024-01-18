import { useState } from "react"
import { useParams } from "react-router-dom"
import PlaceFinder from "../apis/PlaceFinder"

function AddReview() {
    const {id} = useParams()
    const [reviewData, setReviewData] = useState({
        name: "",
        review: "",
        rating: "1"
    })

    function handleChange(event) {
        const {name, value} = event.target

        setReviewData(prevValue => {
            return ({
                ...prevValue,
                [name]: value
            })
        })
    }

    async function handleAddReview(event) {
        event.preventDefault()
        try {
            await PlaceFinder.post(`/${id}/addReview`, {
                name: reviewData.name === "" ? "Anonymous" : reviewData.name,
                review: reviewData.review,
                rating: reviewData.rating
            })
        } catch (err) {
            console.log(err)
        }
        window.location.reload()
    }

    return (
        <div>
            <button className="btn btn-primary mb-3 mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Add a review
            </button>
            <div className="collapse" id="collapseExample">
                <div className="card card-body">
                    <form action="" className="form-row g-3">
                        <div className="row">
                            <div className="form-group col-8">
                                <label htmlFor="name">Name</label>
                                <input onChange={handleChange} id="name" name="name" type="text" className="form-control" value={reviewData.name}/>
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
                            <textarea onChange={handleChange} id="review" name="review" className="form-control" value={reviewData.review}></textarea>
                        </div>
                        <button onClick={handleAddReview} type="submit" className="btn btn-primary mt-3">Review</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddReview