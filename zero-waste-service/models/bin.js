/*
 * Creates and exports the bin model
 */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * @param name Name of the bin provided by the user, e.g. Kitchen bin
 * @param pid Physical id of the bin, unique to every bin
 * @param userId user of the bin, under whose name is the bin registered
 * @param status Full/Fillable - Tells if the bin is full or not
 */
const binSchema = new Schema(
  {
    name: { type: String, required: [true, ""] },
    pid: { type: String, required: [true, ""] },
    userId: { type: Schema.Types.ObjectId, required: [true, ""], ref: "user" },
    status: {
      type: String,
      required: [true, ""],
      enum: ["Full", "Fillable"],
      default: "Fillable",
    },
  },
  { collection: "bin" }
);

const bin = mongoose.model("bin", binSchema);

module.exports = bin;
