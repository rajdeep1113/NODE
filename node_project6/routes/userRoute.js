const express = require("express");
const { userModel } = require("../models/SignUpModel");
const bcrypt = require("bcrypt");
let nodemailer = require("nodemailer");
const userRoute = express.Router();


userRoute.get("/", (req, res) => {
    return res.render("login");
});

userRoute.get("/signup", (req, res) => {
    return res.render("signup");
});

userRoute.get("/forgotPassword", (req, res) => {
    return res.render("forgotPassword");
});

userRoute.get("/otpPage", (req, res) => {
    let email = req.cookies.forgotGmail;
    if (email) {
        return res.render("otpPage");
    }
    console.log("No email found — redirecting to forgot password");
    return res.redirect("/forgotPassword");
});

userRoute.get("/passwordChange", (req, res) => {
    let otpVerified = req.cookies.otpVerified;
    let email = req.cookies.forgotGmail;
    if (otpVerified && email) {
        return res.render("passwordChange");
    }
    console.log("OTP not verified — access denied");
    return res.redirect("/forgotPassword");
});

userRoute.get("/home", (req, res) => {
    let getData = req.cookies.userData;
    if (getData) {
        return res.render("home");
    }
    return res.redirect("/");
});

userRoute.get("/blogs", (req, res) => {
    let getData = req.cookies.userData;
    if (getData) {
        return res.render("blogs");
    }
    return res.redirect("/");
});

userRoute.get("/about", (req, res) => {
    let getData = req.cookies.userData;
    if (getData) {
        return res.render("about");
    }
    return res.redirect("/");
});

userRoute.get("/categories", (req, res) => {
    let getData = req.cookies.userData;
    if (getData) {
        return res.render("categories");
    }
    return res.redirect("/");
});

userRoute.get("/contact", (req, res) => {
    let getData = req.cookies.userData;
    if (getData) {
        return res.render("contact");
    }
    return res.redirect("/");
});

userRoute.get("/logout", (req, res) => {
    res.clearCookie("userData");
    res.redirect("/");
});



userRoute.post("/add", async (req, res) => {
    let { userName, userEmail, password } = req.body;
    password = await bcrypt.hash(password, 10);
    try {
        await userModel.create({ userName, userEmail, password });
        res.redirect("/");
        console.log("User Successfully Registered");
    } catch (error) {
        console.log(error);
    }
});

userRoute.post("/login", async (req, res) => {
    let { userEmail, password } = req.body;
    let userData = await userModel.findOne({ userEmail });
    if (userData) {
        bcrypt.compare(password, userData.password, (error, result) => {
            if (result) {
                res.cookie("userData", userData);
                res.redirect("/home");
                console.log("user Login Successfully");
            } else {
                console.log("password is invalid");
            }
        });
    } else {
        console.log("User Not Found");
    }
});



userRoute.post("/forgotPass", async (req, res) => {
    try {
        const { userEmail } = req.body;
        console.log("User email from form:", userEmail);
        const userData = await userModel.findOne({ userEmail });
        if (!userData) {
            console.log("User not found");
            return res.status(404).send("User not found");
        }
        res.cookie("forgotGmail", userEmail);
        const otp = Math.floor(1000 + Math.random() * 9000);
        console.log("Generated OTP:", otp);
        res.cookie("storeOtp", otp, { maxAge: 5 * 60 * 1000 });
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "prabhssgg@gmail.com",
                pass: "jkyn vite uqau jlmv",
            },
        });
        const mailOptions = {
            from: "prabhssgg@gmail.com",
            to: userData.userEmail,
            subject: "Your Password Reset OTP",
            text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
        };
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        res.redirect("/otpPage");
    } catch (error) {
        console.error("Error sending mail:", error);
        res.status(500).send("Error sending OTP");
    }
});

userRoute.post("/checkOtp", (req, res) => {
    let storeOtp = req.cookies.storeOtp;
    let getOtp = req.body.otpNumber;
    if (getOtp === storeOtp) {
        res.cookie("otpVerified", true, { maxAge: 5 * 60 * 1000 });
        console.log("OTP verified successfully");
        return res.redirect("/passwordChange");
    } else {
        console.log("OTP did not match");
        return res.redirect("/otpPage");
    }
});

userRoute.post("/changePassword", async (req, res) => {
    try {
        const { newPassword, confirmPassword } = req.body;
        const userEmail = req.cookies.forgotGmail;
        if (!userEmail) {
            console.log("No email found in cookies");
            return res.redirect("/forgotPassword");
        }
        if (newPassword !== confirmPassword) {
            console.log("Passwords do not match");
            return res.send("Passwords do not match!");
        }
        const user = await userModel.findOne({ userEmail });
        if (!user) {
            console.log("User not found for email:", userEmail);
            return res.redirect("/forgotPassword");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
        console.log("Password successfully changed for:", userEmail);
        res.clearCookie("forgotGmail");
        res.clearCookie("storeOtp");
        res.clearCookie("otpVerified");
        res.redirect("/");
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).send("Something went wrong while changing password.");
    }
});

module.exports = { userRoute };
