import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import bodyParser from "body-parser"
import * as db from "./db/index.js"

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// get all places
app.get("/api/v1/places", async (req, res) => {
    try {
        // const result = await db.query("SELECT * FROM places")
        const result = await db.query("SELECT * FROM places LEFT JOIN (SELECT place_id, COUNT(*), ROUND(AVG(rating), 1) AS average_rating FROM reviews GROUP BY place_id) reviews ON places.id = reviews.place_id;")
        // console.log(result)
        res.status(200).json({
            status: "success",
            result: result.rows.length,
            data: {
                places: result.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// get a place
app.get("/api/v1/places/:id", async (req, res) => {
    try {
        const place = await db.query("SELECT * FROM places LEFT JOIN (SELECT place_id, COUNT(*), ROUND(AVG(rating), 1) AS average_rating FROM reviews GROUP BY place_id) reviews ON places.id = reviews.place_id WHERE id = $1", [req.params.id])
        const images = await db.query("SELECT * FROM place_images WHERE place_id = $1", [req.params.id])
        const reviews = await db.query("SELECT id, place_id, name, review, rating, TO_CHAR(review_date, 'Month dd, yyyy') AS date FROM reviews WHERE place_id = $1", [req.params.id])
        res.status(200).json({
            status: "success",
            data: {
                place: place.rows[0],
                images: images.rows,
                reviews: reviews.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// search a place
app.get("/api/v1/places/search/:name", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM places WHERE name ILIKE '%' || $1 || '%'", [req.params.name])
        res.status(200).json({
            status: "success",
            data: {
                places: result.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// add a place
app.post("/api/v1/places", async (req, res) => {
    try {
        const result = await db.query("INSERT INTO places (name, location) VALUES ($1, $2) RETURNING *", [
            req.body.name,
            req.body.location
        ])
        res.status(200).json({
            status: "success",
            data: {
                place: result.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// update a place
app.put("/api/v1/places/:id", async (req, res) => {
    try {
        const result = await db.query("UPDATE places SET name = $1, location = $2 WHERE id = $3 RETURNING *", [
            req.body.name,
            req.body.location,
            req.params.id
        ])
        res.status(200).json({
            status: "success",
            data: {
                places: result.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// delete a place
app.delete("/api/v1/places/:id", async (req, res) => {
    try {
        const result = await db.query("DELETE FROM places WHERE id = $1", [req.params.id])
        res.status(200).json({
            status: "success"
        })
    } catch (err) {
        console.log(err)
    }
})

// add a review
app.post("/api/v1/places/:id/addReview", async (req, res) => {
    try {
        const result = await db.query("INSERT INTO reviews (place_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *", [
            req.params.id, 
            req.body.name, 
            req.body.review,
            req.body.rating
        ])
        res.status(200).json({
            status: "success",
            data: {
                reviews: result.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// get a review
app.get("/api/v1/places/review/:id", async (req, res) => {
    try {
        const reviews = await db.query("SELECT * FROM reviews WHERE id = $1", [req.params.id])
        res.status(200).json({
            status: "success",
            data: {
                review: reviews.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// update a review
app.put("/api/v1/places/:id/updateReview", async (req, res) => {
    try {
        const result = await db.query("UPDATE reviews SET name = $1, review = $2, rating = $3 WHERE id = $4 RETURNING *", [
            req.body.name,
            req.body.review,
            req.body.rating,
            req.params.id
        ])
        res.status(200).json({
            status: "success",
            data: {
                places: result.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// delete a review
app.delete("/api/v1/places/:id/deleteReview", async (req, res) => {
    try {
        const result = await db.query("DELETE FROM reviews WHERE id = $1", [req.params.id])
        res.status(200).json({
            status: "success"
        })
    } catch (err) {
        console.log(err)
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})