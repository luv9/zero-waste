const express = require("express");
const router = express.Router();
const models = require("../models/index");
const verifyToken = require("../controllers/authJWT");

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
    .select("name userId status")
    .exec((err, result) => {
      if (err) return "Error with fetching data";

      return res.status(200).send(result);
    });
});

router.post("/save", verifyToken, function (req, res) {
  console.log(req.verifiedUser);
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

router.post("/update", verifyToken, async function (req, res) {
  console.log(req.verifiedUser);
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

  let doc = await bin.findByIdAndUpdate(entry._id, { status: status });

  bin
    .findOne()
    .where("pid")
    .equals(pid)
    .exec(async function (err, entry) {
      if (err) {
        return res.status(500).send("Error with database");
      }
      if (entry) {
        let doc = await bin.findByIdAndUpdate(entry._id, { status: status });
        return res.status(200).send("Bin data updated successfully!");
      } else {
        return res.status(403).send("Bin not found");
      }
    });
});

module.exports = router;
