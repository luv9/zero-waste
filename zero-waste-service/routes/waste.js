const express = require('express')
const router = express.Router();
const models = require('./../models/index')

router.get('/', function (req, res) {
    res.send("All waste routes will be defined here");
})

router.post('/', function (req, res) {
    const binId = req.body.id;
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;
    if(binId == null || fromDate == null || toDate == null || !(fromDate instanceof Date) || !(toDate instanceof Date)) {
        throw new Error("Input format is incorrect")
    }
    if(fromDate > toDate) {
        throw new Error("From date is greater than To date")
    }

    const waste = models.waste;
    waste.find()
    .where("binId")
    .equals(binId)
    .where("date")
    .gte(fromDate)
    .where("date")
    .lte(toDate)
    .select(totalWeight)
    .exec((err, weights) => {
        if (err) return "Error with fetching data";
        
        return weights.reduce((a, b) => a + b, 0)
    })

})

module.exports = router;