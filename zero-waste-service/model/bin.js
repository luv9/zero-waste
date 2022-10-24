const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const binSchema = new Schema({
    name: String,
    pid: String,
    userId: String,
    status: String,
})

const bin = mongoose.model("bin", binSchema);

module.exports = {
    bin
}