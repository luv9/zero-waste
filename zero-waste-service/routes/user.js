const express = require('express')
const router = express.Router();
const models = require('./../models/index')
const bcrypt = require("bcrypt")
const config = require("../config/config")
const jwt = require("jsonwebtoken")

router.get('/', function (req, res) {
    res.send("User routes go here");
})

router.post('/signup', async function (req, res) {
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

router.post('/logout', function(req, res) {
    res.cookie('token', undefined, { httpOnly: true });
    return res.status(200).send({"logout": "true"})
})

router.post('/login', async function (req, res) {
    const user = models.user;
    const email = req.body.email;
    const password = req.body.password;
    user.findOne({
        email: email
    }).exec((err, entry) => {
        if(err) {
            return res.status(500).send("Some error occurred with fetching details from db")
        }
        if(!entry) {
            return res.status(404).send("Couldn't find the user")
        } else {
            bcrypt.compare(password, entry.password, function(err, isValid){
                if(err) {
                    return res.status(500).send("Some error occurrred. Please try again in some time.")
                }
                if(!isValid) {
                    return res.status(401).send("Invalid password")
                } else {
                    const token = jwt.sign({
                        id: entry._id
                        }, config.secret_key, {
                        expiresIn: 86400
                    });
                    res.cookie('token', token, { httpOnly: true });
                    res.status(200)
                    .send({
                      user: {
                        id: entry._id,
                        email: entry.email,
                        fullName: entry.name,
                      },
                      message: "Login successful",
                    });
                }
            })
        }
        
    });
})

module.exports = router;