import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { PlacesContext } from "../context/PlacesContext"
import PlaceFinder from "../apis/PlaceFinder"
import Reviews from "../components/Reviews"
import AddReview from "../components/AddReview"
import Header from "../components/Header"
import StarRating from "../components/StarRating"
import ImageCarousel from "../components/ImageCarousel"

function PlaceDetailPage() {
    const {id} = useParams()
    const {selectedPlace, setSelectedPlace} = useContext(PlacesContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await PlaceFinder.get(`/${id}`)
                setSelectedPlace(response.data.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [])

    return (
        <div>
            {selectedPlace && (
                <>
                    <Header logoURL="../logo.png"/>
                    <ImageCarousel images={selectedPlace.images}/>
                    <h1 className="mt-5">{selectedPlace.place.name}</h1>
                    <h6>{selectedPlace.place.location}</h6>
                    <p><StarRating rating={selectedPlace.place.average_rating} /> ({selectedPlace.place.count === null ? 0 : selectedPlace.place.count})</p>
                    <p>{selectedPlace.place.description}</p>
                    <h3 className="mt-5">Reviews</h3>
                    <AddReview />
                    <hr />
                    <div>
                        <Reviews reviews={selectedPlace.reviews} />
                    </div>
                </>
            )}
        </div>
    )
}

export default PlaceDetailPage