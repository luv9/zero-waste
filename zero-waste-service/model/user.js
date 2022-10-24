const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    isAlexaIntegrated: Boolean,
})

const user = mongoose.model("user", userSchema);

module.exports = {
    user
}