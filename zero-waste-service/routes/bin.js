const express = require("express");
const router = express.Router();
const models = require("../models/index");
const { verifyToken } = require("../controllers/authJWT");
const Redis = require("ioredis");
const redis = new Redis();

/**
 * Retrieves bins associated to a particular user
 * 
 * @param {string} routePath Defines the route path which will trigger this method
 * @param {middleware} verifyToken verifies the user before processing the request
 * @param {function} processRequest retrieves bins data based on user id
 * @returns {JSON} array of bins of the user
 */
router.post("/", verifyToken, function (req, res) {
  const userId = req.body.userId;
  if (!req.verifiedUser) {
    return res.status(403).send({
      message: "Invalid JWT token/User not authorised",
    });
  }
  if (userId == null) {
    throw new Error("Input format is incorrect");
  }

  const bin = models.bin;
  bin
    .find()
    .where("userId")
    .equals(userId)
    .select("name status")
    .exec((err, result) => {
      if (err) return "Error with fetching data";

      return res.status(200).send(result);
    });
});

/**
 * Retrieves bin's current weight datewise for all the days
 * 
 * @param {string} routePath Defines the route path which will trigger this method
 * @param {middleware} verifyToken verifies the user before processing the request
 * @param {function} processRequest retrieves bins data based on bin id 
 * @returns {JSON} array of bins of the user
 */
router.get("/weight/:binId", verifyToken, function (req, res) {
  const binId = req.params.binId;
  if (!req.verifiedUser) {
    return res.status(403).send({
      message: "Invalid JWT token/User not authorised",
    });
  }
  if (binId == null) {
    throw new Error("Input format is incorrect");
  }

  const waste = models.waste;
  waste
    .find()
    .where("binId")
    .equals(binId)
    .select("currentWeight date")
    .sort({ date: -1 })
    .exec((err, result) => {
      if (err) return "Error with fetching data";

      return res.status(200).send("" + result[0].currentWeight);
    });
});

/**
 * Saves a bin in the database
 * 
 * @param {string} routePath Defines the route path which will trigger this method
 * @param {middleware} verifyToken verifies the user before processing the request
 * @param {function} processRequest retrieves bins details, validate the details and saves it in db
 */
router.post("/save", verifyToken, function (req, res) {
  if (!req.verifiedUser) {
    return res.status(403).send({
      message: "Invalid JWT token/User not authorised",
    });
  }
  const name = req.body.name;
  const pid = req.body.pid;
  const userId = req.body.userId;
  const status = req.body?.status ?? "Fillable";

  if (!pid || !name || !userId || !status) {
    throw new Error("Input format is incorrect");
  }

  const bin = models.bin;

  const User = models.user;

  const newBin = new bin({ name, pid, userId, status });

  User.countDocuments({ _id: userId }, function (err, count) {
    if (err) {
      return res
        .status(500)
        .send("Some error occurred with fetching details from db");
    }
    if (count == 0) {
      return res.status(500).send("User not found");
    } else {
      bin.countDocuments({ pid: pid, userId: userId }, function (err, count) {
        if (err) {
          return res
            .status(500)
            .send("Some error occurred with fetching details from db");
        }
        if (count > 0) {
          return res.status(500).send("Bin already exists for the user");
        }
        newBin.save(function (error) {
          if (error) {
            console.log(error);
            return res.status(500).send("Some error occurred while saving");
          } else {
            console.log("Bin saved successfully");
            return res.status(200).send("Bin saved successfully");
          }
        });
      });
    }
  });
});

/**
 * Retrieves bin's data and update it in db
 * 
 * @param {string} routePath Defines the route path which will trigger this method
 * @param {middleware} verifyToken verifies the user before processing the request
 * @param {function} processRequest retrieves bins data and status and update the details in db
 */
router.post("/update", verifyToken, async function (req, res) {
  // console.log(req.verifiedUser);
  if (!req.verifiedUser) {
    return res.status(403).send({
      message: "Invalid JWT token/User not authorised",
    });
  }
  // if(!req.verifyToken)
  const name = req.body.name;
  const pid = req.body.pid;
  const userId = req.body.userId;
  const status = req.body?.status ?? "Fillable";

  if (!pid || !name || !userId || !status) {
    throw new Error("Input format is incorrect");
  }

  const bin = models.bin;

  const User = models.user;

  // let doc = await bin.findByIdAndUpdate(entry._id, { status: status });

  bin
    .findOne()
    .where("pid")
    .equals(pid)
    .exec(async function (err, entry) {
      if (err) {
        return res.status(500).send("Error with database");
      }
      if (entry) {
        if (status === "Full") {
          redis.publish(
            `bin_status_${entry.userId}`,
            JSON.stringify({ binId: entry._id.toString(), status, name })
          );
        }
        let doc = await bin.findByIdAndUpdate(entry._id, { status: status });
        return res.status(200).send("Bin data updated successfully!");
      } else {
        return res.status(403).send("Bin not found");
      }
    });
});

module.exports = router;
