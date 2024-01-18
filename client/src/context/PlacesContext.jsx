import React, { useState, createContext } from "react"

export const PlacesContext = createContext()

export const PlacesContextProvider = (props) => {
    const [places, setPlaces] = useState([])
    const [selectedPlace, setSelectedPlace] = useState(null)
    const [placeName, setPlaceName] = useState("")

    function addPlace(place) {
        setPlaces([...places, place])
    }

    return (
        <PlacesContext.Provider value={{ places, setPlaces, addPlace, selectedPlace, setSelectedPlace, placeName, setPlaceName }}>
            {props.children}
        </PlacesContext.Provider>
    )
}