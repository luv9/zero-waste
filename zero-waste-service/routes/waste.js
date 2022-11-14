const express = require("express");
const router = express.Router();
const models = require("./../models/index");
const verifyToken = require("./../controllers/authJWT");

router.get("/", function (req, res) {
  res.send("All waste routes will be defined here");
});

router.post("/", verifyToken, function (req, res) {
  if (!req.verifiedUser) {
    return res.status(403).send({
      message: "Invalid JWT token/User not authorised",
    });
  }
  const binId = req.body.binId;
  const fromDate = new Date(req.body.fromDate);
  const toDate = new Date(req.body.toDate);
  if (
    binId == null ||
    fromDate == null ||
    toDate == null ||
    !(fromDate instanceof Date) ||
    !(toDate instanceof Date)
  ) {
    return res.status(500).send("Input format is incorrect");
  }
  if (fromDate > toDate) {
    return res.status(500).send("From date is greater than To date");
  }

  const waste = models.waste;
  waste
    .find()
    .where("binId")
    .equals(binId)
    .where("date")
    .gte(fromDate)
    .where("date")
    .lte(toDate)
    .select("totalWeight")
    .exec((err, weights) => {
      if (err) return res.status(500).send("Error with fetching data");

      return res.status(200).send(weights.reduce((a, b) => a + b, 0));
    });
});

router.post("/save", verifyToken, async function (req, res) {
  console.log("hereeeee");
  if (!req.verifiedUser) {
    return res.status(403).send({
      message: "Invalid JWT token/User not authorised",
    });
  }
  console.log(req.body);
  const binId = req.body.binId;
  let wt = req.body.weight;
  const today = new Date().toISOString().slice(0, 10);
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday = yesterday.toISOString().slice(0, 10);
  const waste = models.waste;
  waste
    .findOne()
    .where("binId")
    .equals(binId)
    .where("date")
    .equals(today)
    .exec(async function (err, entry) {
      if (err) {
        return res.status(500).send("Error with database");
      }
      if (entry) {
        let totalWeight = 0;
        if (wt > 0.000001) {
          totalWeight = entry.totalWeight + (wt - entry.currentWeight);
        }
        let doc = await waste.findByIdAndUpdate(entry._id, {
          totalWeight: totalWeight,
          currentWeight: wt,
        });
        return res.status(200).send("Data updated successfully!");
      } else {
        waste
          .findOne()
          .where("binId")
          .equals(binId)
          .where("date")
          .equals(yesterday)
          .exec(async function (er, e) {
            if (er) {
              return res.status(500).send("Error with database");
            } else if (e) {
              let totalWeight = 0;
              if (wt > 0.000001 && wt > e.currentWeight) {
                totalWeight = wt - e.currentWeight;
              }
              const newEntry = new waste({
                currentWeight: wt,
                totalWeight: totalWeight,
                binId: binId,
                date: today,
              });
              newEntry.save(function (error) {
                if (error) {
                  console.log(error);
                  return res
                    .status(500)
                    .send("Some error occurred while saving");
                } else {
                  return res.status(200).send("Data saved successfully");
                }
              });
            } else {
              const newEntry = new waste({
                currentWeight: wt,
                totalWeight: wt,
                binId: binId,
                date: today,
              });
              newEntry.save(function (error) {
                if (error) {
                  console.log(error);
                  return res
                    .status(500)
                    .send("Some error occurred while saving");
                } else {
                  return res.status(200).send("Data saved successfully");
                }
              });
            }
          });
      }
    });
});

router.post("/data", verifyToken, function (req, res) {
  if (!req.verifiedUser) {
    return res.status(403).send({
      message: "Invalid JWT token/User not authorised",
    });
  }
  const binId = req.body.binId;
  const fromDate = new Date(req.body.fromDate);
  const toDate = new Date(req.body.toDate);
  console.log(fromDate, toDate, binId);
  if (
    binId == null ||
    fromDate == null ||
    toDate == null ||
    !(fromDate instanceof Date) ||
    !(toDate instanceof Date)
  ) {
    return res.status(500).send("Input format is incorrect");
  }
  if (fromDate > toDate) {
    return res.status(500).send("From date is greater than To date");
  }

  const waste = models.waste;
  waste
    .find()
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

      return res.status(200).send(weights);
    });
});

module.exports = router;
