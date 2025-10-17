const mongoose = require("mongoose")


const dbConnect = async () => {
    await mongoose.connect("mongodb://127.0.0.1/movie")
    console.log("DataBase Successfully Connected")
}

module.exports = { dbConnect }