/*
 * Creates and exports waste model
 */
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * @param binId bin in which the waste is being collected
 * @param date date on which the waste is collected
 * @param totalWeight total weight collected on a given day
 * @param currentWeight current weight of the bin on a given day
 */
const wasteSchema = new Schema(
  {
    binId: { type: Schema.Types.ObjectId, required: [true, ""], ref: "bin" },
    date: { type: Date, required: [true, ""] },
    totalWeight: { type: Number, required: [true, ""] },
    currentWeight: {
      type: Number,
      min: [0, "Weight cannot be negative"],
      required: [true, ""],
    },
  },
  { collection: "waste" }
);

const waste = mongoose.model("waste", wasteSchema);

module.exports = waste;
