const express = require("express")
const { MovieAddRoute } = require("./routes/movieAddRoute")
const { dbConnect } = require("./config/dbconnect")
const path = require("path")
const fs = require("fs")
const app = express()
const PORT = 8080


app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/uploads" , express.static(path.join(__dirname , "/uploads")))
app.use("/", MovieAddRoute)

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server is not Running at", PORT)
        return
    }   
    dbConnect()
    console.log("Server is Running at", PORT)
})