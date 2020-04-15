const express = require("express");
const router = express.Router();
const user = require("../model/user")

router.get("/", (req, res) => {
    res.send("ca marche")
})

router.post("/signup", (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;
    if (!name || !email || !password) {
        res.status(404).json({
            error: "please fill all field"
        })
    } else {
        res.status(200).json({
            name,
            email,
            password
        })
    }

    const User = new user({
        name,
        email,
        password
    })

    User.save().then(resu => res.send(resu)).catch(err => res.send(err))


})

module.exports = router