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
  it('should throw error with 401 status if we try to login with a wrong password', function(done) {
        const User = {
            email: 'luv123@gmail.com',
            password: 'any random string',
            name: 'Abc Def'
        }
        request('localhost:3000')
          .post('/user/login')
          .send(User)
          .end(function(err,res) {
              if (err) {
                  throw err;
              }

              res.text.should.equal('Invalid password');
              res.status.should.equal(401)
              
          });
          done();
    });

    it('should logout if you\'re logged in', function(done) {
        const User = {
            email: 'luv123@gmail.com',
            password: 'hello-hello',
            
        }
        request('localhost:3000')
          .post('/user/login')
          .send(User)
          .end(function(err,res) {
              if (err) {
                  throw err;
              }
          });
        request('localhost:3000')
        .post('/user/logout')
        .send()
        .end(function(err,res) {
            if (err) {
                throw err;
            }
            res.body.logout.should.equal('true');
            res.status.should.equal(200)
        });
        done();
    });

    it('should throw error with 500 status if we try to signup a new user with an already existing email', function(done) {
          const User = {
              email: 'luv123@gmail.com',
              password: 'any random string',
              name: 'Abc Def'
          }
          request('localhost:3000')
            .post('/user/signup')
            .send(User)
            .end(function(err,res) {
                if (err) {
                    throw err;
                }

                res.text.should.equal('Email already exists');
                res.status.should.equal(500)
                
            });
            done();
    });

    it('should throw error with 500 status if we try to call signup api with empty email', function(done) {
        let User = {
            email: '',
            password: 'any random string',
            name: 'Abc Def'
        }
        request('localhost:3000')
          .post('/user/signup')
          .send(User)
          .end(function(err,res) {
              if (err) {
                  throw err;
              }

              res.text.should.equal('Invalid details');
              res.status.should.equal(500)
        });
        done();
    
    });

});


