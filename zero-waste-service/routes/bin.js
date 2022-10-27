const express = require('express')
const router = express.Router();
const models = require('../models/index')

router.post('/', function (req, res) {
    const userId = req.body.userId;
    if(userId == null) {
        throw new Error("Input format is incorrect")
    }

    const bin = models.bin;
    bin.find()
    .where("userId")
    .equals(userId)
    .select("name userId status")
    .exec((err, result) => {
        if (err) return "Error with fetching data";

        return res.status(200).send(result);
    })
})

router.post('/save', function (req, res) {
    const name = req.body.name;
    const pid = req.body.pid;
    const userId = req.body.userId;
    const status = req.body?.status ?? 'Fillable';

    if(!pid || !name || !userId || !status) {
        throw new Error("Input format is incorrect")
    }

    const bin = models.bin;

    const newBin = new bin({ name, pid, userId, status })

    bin.countDocuments({pid: pid, userId: userId}, function (err, count) {
    
        if (err) {
            return res.status(500).send("Some error occurred with fetching details from db");
        }
        if (count > 0) {
            return res.status(500).send("Bin already exists for the user")
        }
        newBin.save(function(error) {
            if (error){
                console.log(error);
                return res.status(500).send("Some error occurred while saving")
            }
            else{
                console.log("Bin saved successfully")
                return res.status(200).send("Bin saved successfully")
            }
        })
    })
})

module.exports = router;