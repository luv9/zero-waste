var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var config = require("./../../config/config");
const user = require('./../../routes/user')

describe('Bin routes', function () {
    
    it('should throw error with 403 status if we try to save a bin without logging in', function(done) {
        request('localhost:3000')
          .post('/bin/save')
          .send()
          .end(function(err,res) {
              if (err) {
                  throw err;
              }

              res.body.message.should.equal('Invalid JWT token/User not authorised');
              res.status.should.equal(403)
              done();
          });
    })

    // it('should throw error with 500 status if we save bin with incorrect user details', function(done) {
    //     const User = {
    //         email: 'luv123@gmail.com',
    //         password: 'hello-hello',
            
    //     }
    //     request('localhost:3000')
    //       .post('/user/login')
    //       .send(User)
    //       .end(function(err,res) {
    //           if (err) {
    //               throw err;
    //           }

    //       });

    //       const Bin = {
    //         name: 'Bin 123',
    //         pid: '2355',
    //         userId: 'invalid_userid',  
    //     }
    //     request('localhost:3000')
    //     .post('/bin/save')
    //     .send(Bin)
    //     .end(function(err,res) {
    //         if (err) {
    //             throw err;
    //         }
    //         res.text.should.equal('User not found');
    //         res.status.should.equal(500);
    //     });

        
    //     request('localhost:3000')
    //         .post('/user/logout')
    //         .send()
    //         .end(function(err,res) {
    //             if (err) {
    //                 throw err;
    //             }
    //         });

    //         done();

    // })

});