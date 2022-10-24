const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const waste = new Schema({
    binId: String,
    date: Date,
    totalWeight: Number,
    currentWeight: Number,
})

module.exports = {
    waste
}