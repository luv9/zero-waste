const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
    name: String,
    email: String,
    password: String,
    isAlexaIntegrated: Boolean,
})

module.exports = {
    user
}