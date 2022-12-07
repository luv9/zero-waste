/*
 * Creates and exports the user model
 */
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * @param name Full name of user
 * @param email Email of the user
 * @param password Encrypted password of the user
 * @param isAlexaIntegrated if user has integrated Alexa with the system
 */
const userSchema = new Schema(
  {
    name: { type: String, required: [true, ""] },
    email: { type: String, required: [true, ""] },
    password: { type: String, required: [true, ""] },
    isAlexaIntegrated: { type: Boolean, required: [true, ""] },
  },
  { collection: "user" }
);
//TODO: alexaDetails: json

const user = mongoose.model("user", userSchema);

module.exports = user;
