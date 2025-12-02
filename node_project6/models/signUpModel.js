const mongoose = require("mongoose")

const signUpSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    userEmail: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },


})


const userModel = mongoose.model("user", signUpSchema)

module.exports = { userModel }