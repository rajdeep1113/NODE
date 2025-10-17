const express = require("express")
const { movieModel } = require("../models/movieModel")
// const { upload } = require("../uploads/multer")
const fs = require("fs")
const path = require("path")
const { upload } = require("../middleware/multer")
const MovieAddRoute = express.Router()


MovieAddRoute.get("/", async (req, res) => {
    try {
        let movieData = await movieModel.find({})
        return res.render("movie", { movieData })
    } catch (error) {
        console.log(error)
    }


})

MovieAddRoute.post("/add", upload, async (req, res) => {
    try {
        if (req.file) {
            req.body.movieImg = "/uploads" + "/" + req.file.filename

        }

        // console.log(req.file)
        await movieModel.create(req.body)
        console.log(req.body)
        console.log("Movie added successfully")
        return res.redirect("/")

    } catch (error) {
        console.log(error)
    }
})

MovieAddRoute.get("/delete/:id", async (req, res) => {
    const id = req.params.id

    const movieData = await movieModel.findById(id)
    console.log(movieData)
    try {
        console.log(movieData.movieImg)
        fs.unlinkSync(path.join(__dirname, "..", movieData.movieImg))
        await movieModel.findByIdAndDelete(id)
        console.log("User Deleted Successfully")
        return res.redirect("/")
    } catch (error) {
        console.log(error)
        return res.redirect("/")
    }

})

MovieAddRoute.get("/edit/:id", async (req, res) => {
    try {
        const id = req.params.id

        let editData = await movieModel.findById(id)
        console.log(editData)
        return res.render("updateMovie", { editData })

    } catch (error) {
        console.log(error)
        return res.redirect("/")
    }
})

MovieAddRoute.post("/update", upload, async (req, res) => {
    try {
        let response = await movieModel.findById(req.body.id)
  
        if (req.file) {
            fs.unlinkSync(path.join(__dirname, "..", response.movieImg))
            req.body.movieImg = "/uploads" + "/" + req.file.filename
        }
        await movieModel.findByIdAndUpdate(req.body.id, req.body)
        console.log("Movie Updated Successfully")
        return res.redirect("/")
    } catch (error) {
        console.log(error)
        return res.redirect("/")
    }
})

module.exports = { MovieAddRoute }