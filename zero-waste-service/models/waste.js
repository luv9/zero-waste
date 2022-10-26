const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wasteSchema = new Schema({
    binId: {type: Schema.Types.ObjectId, required: [true, ""], ref: "bin"},
    date: {type: Date, required: [true, ""]},
    totalWeight: {type: Number, required: [true, ""]},
    currentWeight: {type: Number, min: [0, "Weight cannot be negative"], required: [true, ""]},
})

const waste = mongoose.model("waste", wasteSchema);

module.exports = waste