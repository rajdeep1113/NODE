const express = require("express")
const PORT = 8080

const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))

let array = []


app.get("/", (req, res) => {
    res.render("home", { array })
})

app.post("/add", (req, res) => {

    let { productName, productImg, productPrice, category } = req.body


    if (!productName.trim() || !productImg.trim() || !productPrice.trim() || !category.trim()) {
        console.log("all field required")
        res.send("please fill all the field before submit")
        res.redirect("/")
    }

    array.push(req.body)
    res.redirect("/")
})


app.get("/delete/:id", (req, res) => {
    // console.log(req.params.id)
    array = array.filter((item, i) => i != req.params.id)

    res.redirect("/")
})

app.get("/edit/:id", (req, res) => {
    let updateData = array[req.params.id]
    // console.log(updateData)

    return res.render("update", { updateData, updateId: req.params.id })

})

app.post("/update", (req, res) => {
    let { updateId, productName, productPrice, productImg, category } = req.body


    if (!productName.trim() || !productImg.trim() || !productPrice.trim() || !category.trim()) {
        console.log("all field required")
        res.send("please fill all the field before update")
    }


    array[updateId] = { productName, productPrice, productImg, category }
    // console.log(array[updateId])
    console.log("update successfully")
    return res.redirect("/")
})

app.listen(PORT, (err) => {
    if (err) {
        console.log("server is not running")
        return
    }
    console.log("server is running", PORT)
}) 
