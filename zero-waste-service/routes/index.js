const express = require("express");
const waste = require("./waste");
const user = require("./user");
const bin = require("./bin");

const router = express.Router();

router.get("/", function (req, res) {
    res.send("All routes go here");
})

router.use("/dashboard", waste);
router.use("/user", user);
router.use("/bin", bin);


module.exports = router;