const express = require('express')
const router = express.Router();
const models = require('./../models/index')
const bcrypt = require("bcrypt")
const config = require("../config/config")

router.get('/', function (req, res) {
    res.send("All user routes will be defined here");
})

router.post('/save', async function (req, res) {
    const user = models.user;
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    if(email == undefined || email == "" || name == undefined || name == "" || password == undefined || password == "") {
        return res.status(500).send("Invalid details")
    }

    const salt = await bcrypt.genSalt(config.salt);
    const hash = await bcrypt.hash(req.body.password, salt)


    user.countDocuments({email: email}, function (err, count) {
        if(err) {
            return res.status(500).send("Some error occurred with fetching details from db")
        }
        if(count > 0) {
            return res.status(500).send("Email already exists")
        }
        const newUser = new user({name: name, email: email, password: hash, isAlexaIntegrated: false})
        newUser.save(function(error) {
            if (error){
                console.log(error);
                return res.status(500).send("Some error occurred while saving")
            }
            else{
                console.log("User saved successfully")
                return res.status(200).send("User saved successfully")
            }
        })
    })

})

module.exports = router;