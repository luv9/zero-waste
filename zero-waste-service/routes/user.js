const express = require("express");
const router = express.Router();
const models = require("./../models/index");
const bcrypt = require("bcrypt");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../controllers/authJWT");


router.get("/", verifyToken, function (req, res) {
  console.log("Token while querying api: " + req.cookies.token);
  if (!req.verifiedUser) {
    return res.status(403).send({
      message: "Invalid JWT token/User not authorised",
    });
  } else {
    return res.status(200).send("User routes go here");
  }
});

/**
 * Retrieves user details and saves the user in db
 * 
 * @param {string} routePath Defines the route path which will trigger this method
 * @param {middleware} verifyToken verifies the user before processing the request
 * @param {function} processRequest retrieves user data, validate it and stores in db
 */
router.post("/signup", async function (req, res) {
  const user = models.user;
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  if (
    email == undefined ||
    email == "" ||
    name == undefined ||
    name == "" ||
    password == undefined ||
    password == ""
  ) {
    return res.status(500).send("Invalid details");
  }

  const salt = await bcrypt.genSalt(config.salt);
  const hash = await bcrypt.hash(req.body.password, salt);

  user.countDocuments({ email: email }, function (err, count) {
    if (err) {
      return res
        .status(500)
        .send("Some error occurred with fetching details from db");
    }
    if (count > 0) {
      return res.status(500).send("Email already exists");
    }
    const newUser = new user({
      name: name,
      email: email,
      password: hash,
      isAlexaIntegrated: false,
    });
    newUser.save(function (error) {
      if (error) {
        console.log(error);
        return res.status(500).send("Some error occurred while saving");
      } else {
        console.log("User saved successfully");
        return res.status(200).send("User saved successfully");
      }
    });
  });
});

/**
 * Logs out an already logged in user
 * 
 * @param {string} routePath Defines the route path which will trigger this method
 * @param {middleware} verifyToken verifies the user before processing the request
 * @param {function} processRequest Deletes the token so user has to login again to use the app
 * @returns {JSON} informs the user about successful logout
 */
router.post("/logout", verifyToken, function (req, res) {
  console.log("Token deleted in logout");
  res.clearCookie("token");
  return res.status(200).send({ logout: "true" });
});

/**
 * User logs in by sending email and password
 * 
 * @param {string} routePath Defines the route path which will trigger this method
 * @param {middleware} verifyToken verifies the user before processing the request
 * @param {function} processRequest Verifies user credentials and logs them in. Stores cookie to remember the user for some time
 */
router.post("/login", async function (req, res) {
  const user = models.user;
  const email = req.body.email;
  const password = req.body.password;
  console.log("Deleting token before starting login");
  res.clearCookie("token");
  user
    .findOne({
      email: email,
    })
    .exec((err, entry) => {
      if (err) {
        return res
          .status(500)
          .send("Some error occurred with fetching details from db");
      }
      if (!entry) {
        return res.status(404).send("Couldn't find the user");
      } else {
        bcrypt.compare(password, entry.password, function (err, isValid) {
          if (err) {
            return res
              .status(500)
              .send("Some error occurrred. Please try again in some time.");
          }
          if (!isValid) {
            return res.status(401).send("Invalid password");
          } else {
            const token = jwt.sign(
              {
                id: entry._id,
              },
              config.secret_key,
              {
                expiresIn: 86400,
              }
            );
            res.cookie("token", token, { httpOnly: true });
            res.cookie("userId", entry._id.toString());
            res.status(200).send({
              user: {
                id: entry._id,
                email: entry.email,
                fullName: entry.name,
              },
              message: "Login successful",
            });
          }
        });
      }
    });
});

/**
 * Checks if a user is logged in or not
 * 
 * @param {string} routePath Defines the route path which will trigger this method
 * @param {middleware} verifyToken verifies the user before processing the request
 * @param {function} processRequest Checks if the token is valid or not
 */
router.post("/loggedInOrNot", verifyToken, function (req, res) {
  if (!req.verifiedUser) {
    return res.status(403).send({
      message: "Invalid JWT token/User not authorised",
    });
  } else {
    return res.status(200).send({
      message: "JWT Token is not expired. User is authorised",
    });
  }
});

module.exports = router;
