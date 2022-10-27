const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: [true, ""]},
    email: {type: String, required: [true, ""]},
    password: {type: String, required: [true, ""]},
    isAlexaIntegrated: {type: Boolean, required: [true, ""]},
    //TODO: alexaDetails: json
})

const user = mongoose.model("user", userSchema);

module.exports = user