const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const binSchema = new Schema({
    name: {type: String, required: [true, ""]},
    pid: {type: String, required: [true, ""]},
    userId: {type: Schema.Types.ObjectId, required: [true, ""]},
    status: {type: String, required: [true, ""]},
})

const bin = mongoose.model("bin", binSchema);

module.exports = {
    bin
}