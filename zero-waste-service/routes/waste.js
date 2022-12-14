const express = require("express");
const router = express.Router();
const models = require("./../models/index");
const { verifyToken } = require("./../controllers/authJWT");

router.get("/", function (req, res) {
  res.send("All waste routes will be defined here");
});


/**
 * Gives bin's data in a given date range
 * 
 * @param {string} routePath Defines the route path which will trigger this method
 * @param {middleware} verifyToken verifies the user before processing the request
 * @param {function} processRequest collects and returns bin's data in a given date range
 * @returns {JSON} date wise waste collected information in a bin
 */
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
    .select("date totalWeight")
    .exec((err, weights) => {
      if (err) return res.status(500).send("Error with fetching data");

      return res.status(200).send(weights);
    });
});


router.post("/saveManual", async function (req, res) {
  const binId = req.body.binId;
  let currentWeight = req.body.currentWeight;
  let totalWeight = req.body.totalWeight;
  let date = new Date().toISOString().slice(0, 10);
  const waste = models.waste;
  const newEntry = new waste({
    currentWeight: currentWeight,
    totalWeight: totalWeight,
    binId: binId,
    date: date,
  });
  newEntry.save(function (error) {
    if (error) {
      console.log(error);
      return res.status(500).send("Some error occurred while saving");
    } else {
      return res.status(200).send("Data saved successfully");
    }
  });
});

/**
 * Saves waste data collected from bin
 * 
 * @param {string} routePath Defines the route path which will trigger this method
 * @param {middleware} verifyToken verifies the user before processing the request
 * @param {function} processRequest retrieves the bin's weight and updates the waste collected in the db
 */
router.post("/save", verifyToken, async function (req, res) {
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

router.post("/save", async function (req, res) {
  const binId = req.body.binId;
  let wt = req.body.weight;
  const today = new Date().toISOString().slice(0, 10);
  let yesterday = new Date();
  let totalWeight = 0;
  let dataFound = false;
  let entryId;
  let errorWithDB = false;
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday = yesterday.toISOString().slice(0, 10);
  const waste = models.waste;
  waste
    .findOne()
    .where("binId")
    .equals(binId)
    .where("date")
    .equals(today)
    .exec((err, entry) => {
      if (err) {
        errorWithDB = true;
        return res.status(500).send("Error with database");
      }
      if (entry) {
        dataFound = true;
        entryId = entry._id;
        if (wt > 0.000001) {
          totalWeight = entry.totalWeight + (wt - entry.currentWeight);
        }
      }
    });
  if (errorWithDB) {
    return;
  }
  if (dataFound) {
    let doc = await waste.findByIdAndUpdate(entryId, {
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
      .exec((err, entry) => {
        if (err) {
          errorWithDB = true;
          return res.status(500).send("Error with database");
        }
        if (entry) {
          dataFound = true;
          entryId = entry._id;
          if (wt > 0.000001 && wt > entry.currentWeight) {
            totalWeight = wt - entry.currentWeight;
          }
        }
      });
    if (errorWithDB) {
      return;
    }
    if (dataFound) {
      const newEntry = new waste({
        currentWeight: wt,
        totalWeight: totalWeight,
        binId: binId,
        date: today,
      });
      newEntry.save(function (error) {
        if (error) {
          console.log(error);
          return res.status(500).send("Some error occurred while saving");
        } else {
          console.log("Data saved successfully");
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
          return res.status(500).send("Some error occurred while saving");
        } else {
          console.log("Data saved successfully");
          return res.status(200).send("Data saved successfully");
        }
      });
    }
  }
});

module.exports = router;
