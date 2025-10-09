const express = require("express")
const { bookRouter } = require("./routes/book")
const { db } = require("./config/db")
const PORT = 7070
const app = express()


app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))

app.use("/books",bookRouter)
app.get("/",(req,res)=>{
    res.redirect("/books")
})

app.listen(PORT,(err)=>{
    if(err){
        console.log("server is not running",PORT)
        return
    }
    db()
    console.log("server is running",PORT)
})