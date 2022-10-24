const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wasteSchema = new Schema({
    binId: String,
    date: Date,
    totalWeight: Number,
    currentWeight: Number,
})

const waste = mongoose.model("waste", wasteSchema);

module.exports = {
    waste
}