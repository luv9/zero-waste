const express = require("express");
const user = require("./user");
const waste = require("./waste");
const bin = require("./bin");

module.exports = {
  user,
  waste,
  bin,
};
