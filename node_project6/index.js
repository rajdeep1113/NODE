const express = require("express")
const { dbconnect } = require("./config/dbconnect")
const { userRoute } = require("./routes/userRoute")

const app = express()
const cookieParser = require("cookie-parser")
const PORT = 8080
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())


app.use("/", userRoute)


app.listen(PORT, (err) => {
    if (err) {
        console.log("server is not running at", PORT)
        return
    }
    dbconnect()
    console.log("server is Running at ", PORT)
})