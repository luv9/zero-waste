const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bin = new Schema({
    name: String,
    pid: String,
    userId: String,
    status: String,
})

module.exports = {
    bin
}