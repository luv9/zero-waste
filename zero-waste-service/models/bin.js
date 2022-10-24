const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const binSchema = new Schema({
    name: {type: String, required: [true, ""]},
    pid: {type: String, required: [true, ""]},
    userId: {type: Schema.Types.ObjectId, required: [true, ""], ref: "user"},
    status: {type: String, required: [true, ""], 
    enum: ["Full", "Fillable"], default: "Fillable",},
})

const bin = mongoose.model("bin", binSchema);

module.exports = {
    bin
}