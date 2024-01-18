import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PlaceFinder from "../apis/PlaceFinder"
import { PlacesContext } from "../context/PlacesContext"
import SearchPlace from "./SearchPlace"
import StarRating from "./StarRating"

function PlaceList() {
    const {places, setPlaces} = useContext(PlacesContext)
    const {placeName, setPlaceName} = useContext(PlacesContext)
    const navigate = useNavigate()

    let response = []

    useEffect(() => {
        const fetchData = async () => {
            try {
                response = await PlaceFinder.get("/")
                setPlaces(response.data.data.places)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    function handlePlaceSelect(placeId) {
        navigate(`place/${placeId}`)
    }
    
    async function handleChange(event) {
        const value = event.target.value
        setPlaceName(value)
    }

    return (
        <>
            <SearchPlace change={handleChange} name={placeName} />
            <div className="mt-5 list-group">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {places && places.filter(place => {
                        return placeName.toLowerCase() === "" ? place : place.name.toLowerCase().includes(placeName)
                    }).map(place => {
                        return (
                            <div key={place.id} className="col">
                                <div className="card">
                                    <img src={place.image_url} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{place.name}</h5>
                                        <h6 className="card-subtitle mb-2 text-body-secondary">{place.location}</h6>
                                        <p className="card-text"><StarRating rating={place.average_rating} /> ({place.count === null ? 0 : place.count})</p>
                                        <p className="card-text">{place.description.substring(0, 100) + "..."}</p>
                                        <button onClick={() => handlePlaceSelect(place.id)} className="btn btn-primary card-link">See reviews</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default PlaceList