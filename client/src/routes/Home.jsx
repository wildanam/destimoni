import Footer from "../components/Footer"
import Header from "../components/Header"
import PlaceList from "../components/PlaceList"
import Slogan from "../components/Slogan"

function Home() {
    return (
        <>
            <Header logoURL="logo.png"/>
            <Slogan />
            <PlaceList />
            <hr/>
            <Footer />
        </>
    )
}

export default Home