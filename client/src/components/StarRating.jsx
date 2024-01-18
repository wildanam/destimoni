function StarRating(props) {
    const stars = []

    for (let i = 1; i <= 5; i++) {
        if (i <= props.rating) {
            stars.push(<i key={i} className="fa-solid fa-star" style={{ color: "gold" }}></i>)
        } else if (i === Math.ceil(props.rating) && !Number.isInteger(props.rating)) {
            stars.push(<i key={i} className="fa-regular fa-star-half-stroke" style={{ color: "gold" }}></i>)
        }
        else {
            stars.push(<i key={i} className="fa-regular fa-star" style={{ color: "gold" }}></i>)
        }
    }

    return (
        <>{stars}</>
    )
}

export default StarRating