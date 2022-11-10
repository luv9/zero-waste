const jwt = require("jsonwebtoken");
const user = require("../models/user");
const config = require("../config/config")

const verifyToken = (req, res, next) => {
    // console.log("cookie token value " + req.cookies.token)
    //if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    if (req.cookies.token) {
      jwt.verify(req.cookies.token, config.secret_key, function (err, decode) {
        if (err) {
            req.verifiedUser = undefined;
            res.cookie('token', undefined, { httpOnly: true });
        }
        user.findOne({
            _id: decode.id
          })
          .exec((err, user) => {
            if (err) {
              res.status(500)
                .send({
                  message: err
                });
            } else {
              req.verifiedUser = user;
              next();
            }
          })
      });
    } else {
      req.verifiedUser = undefined;
      res.cookie('token', undefined, { httpOnly: true });
      next();
    }
  };
  module.exports = verifyToken;