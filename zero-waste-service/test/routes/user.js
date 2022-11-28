var should = require("should");
var assert = require("assert");
var request = require("supertest");
var mongoose = require("mongoose");
var config = require("./../../config/config");
const user = require("./../../routes/user");

describe("User routes", function () {
  it("should throw error with 500 status if we try to signup a new user with an already existing email", function (done) {
    const User = {
      email: "luv123@gmail.com",
      password: "any random string",
      name: "Abc Def",
    };
    request("localhost:3000")
      .post("/user/signup")
      .send(User)
      .end(function (err, res) {
        if (err) {
          throw err;
        }

        res.text.should.equal("Email already exists");
        res.status.should.equal(500);
        done();
      });
  });
});
