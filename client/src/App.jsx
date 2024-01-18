import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PlaceDetailPage from "./routes/PlaceDetailPage"
import Home from "./routes/Home"
import { PlacesContextProvider } from "./context/PlacesContext"

function App() {
  return (
    <PlacesContextProvider>
      <div className="container">
        <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/place/:id" element={<PlaceDetailPage />} />
          </Routes>
        </Router>
      </div>
    </PlacesContextProvider>
  )
}

export default App
