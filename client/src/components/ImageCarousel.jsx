function ImageCarousel(props) {
    return (
        <>
            <div id="carouselExampleIndicators" className="carousel slide mt-5" data-bs-ride="true">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    {props.images.map((image, index) => {
                        if (index === 0) {
                            return (
                                <div className="carousel-item active" key={index}>
                                    <img src={image.image_url} className="d-block w-100" alt="..." />
                                </div>
                            )
                        } else {
                            return (
                                <div className="carousel-item" key={index}>
                                    <img src={image.image_url} className="d-block w-100" alt="..." />
                                </div>
                            )
                        }
                    })}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default ImageCarousel