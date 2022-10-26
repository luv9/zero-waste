const express = require("express");
const waste = require("./waste");

const router = express.Router();

router.get("/", function (req, res) {
    res.send("All routes go here");
})

router.use("/dashboard", waste);


module.exports = router;