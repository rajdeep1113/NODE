const mongoose = require("mongoose")

const dbconnect = async () => {
    await mongoose.connect("mongodb://127.0.0.1/Project6")
    console.log("Data Base Successfully Connected")
}

module.exports = { dbconnect }