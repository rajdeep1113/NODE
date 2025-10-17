const mongoose = require("mongoose")

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,

    },
    director: {
        type: String,
        require: true
    },
    releaseYear: {
        type: Number,
        require: true,
    },
    rating: {
        type: Number,
        require: true,
        min: 0,
        max: 10,
    },
    movieImg: {
        type: String,
        require: true
    },
    duration: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true

    },


})

const movieModel = mongoose.model("movie", movieSchema)

module.exports = { movieModel }