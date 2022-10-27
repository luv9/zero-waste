const express = require('express')
const router = express.Router();
const models = require('./../models/index')

router.get('/', function (req, res) {
    res.send("All waste routes will be defined here");
})

router.post('/', function (req, res) {
    const binId = req.body.id;
    const fromDate = new Date(req.body.fromDate);
    const toDate = new Date(req.body.toDate);
    if(binId == null || fromDate == null || toDate == null || !(fromDate instanceof Date) || !(toDate instanceof Date)) {
        return res.status(500).send("Input format is incorrect")
    }
    if(fromDate > toDate) {
        return res.status(500).send("From date is greater than To date")
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
        if (err) 
            return res.status(500).send("Error with fetching data");
        
        return res.status(200).send(weights.reduce((a, b) => a + b, 0))
    })

})

router.post('/data', function (req, res) {
    const binId = req.body.binId;
    const fromDate = new Date(req.body.fromDate);
    const toDate = new Date(req.body.toDate);
    console.log(fromDate, toDate, binId)
    if(binId == null || fromDate == null || toDate == null || !(fromDate instanceof Date) || !(toDate instanceof Date)) {
        return res.status(500).send("Input format is incorrect")
    }
    if(fromDate > toDate) {
        return res.status(500).send("From date is greater than To date")
    }

    const waste = models.waste;
    waste.find()
    .where("binId")
    .equals(binId)
    .where("date")
    .gte(fromDate)
    .where("date")
    .lte(toDate)
    .select("date totalWeight currentWeight")
    .exec((err, weights) => {
        if (err) 
            return res.status(500).send("Error with fetching data" + err.message);

        return res.status(200).send(weights)
    })

})

module.exports = router;