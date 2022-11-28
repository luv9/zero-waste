const jwt = require("jsonwebtoken");
const user = require("../models/user");
const config = require("../config/config");
const parseCookie = require("../utility/utils");

const verifyTokenForWs = async (msg) => {
  const cookie = parseCookie(msg);
  const token = cookie["token"];
  let isVerified = false;
  if (token) {
    const decode = jwt.verify(token, config.secret_key);
    // console.log('jwtToken: ', jwtToken);
    if (decode && decode.id) {
      const User = await user.findOne({
        _id: decode.id,
      });
      if (User) {
        isVerified = true;
      }
    }
  }
  return isVerified;
};

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token ?? req.header("token");
  if (token) {
    jwt.verify(token, config.secret_key, function (err, decode) {
      if (err) {
        req.verifiedUser = undefined;
        console.log("Token deleted in middleware - jwt verify error");
        res.clearCookie("token");
        next();
      }
      if (decode && decode.id) {
        user
          .findOne({
            _id: decode.id,
          })
          .exec((err, User) => {
            if (err) {
              res.status(500).send({
                message: err,
              });
              req.verifiedUser = undefined;
              console.log("Token deleted in middleware - user not found");
              res.clearCookie("token");
              next();
            } else {
              req.verifiedUser = User;
              next();
            }
          });
      } else {
        req.verifiedUser = undefined;
        console.log("Token deleted in middleware - decode details not found");
        res.clearCookie("token");
        next();
      }
    });
  } else {
    req.verifiedUser = undefined;
    console.log("Token deleted in middleware - no token found");
    res.clearCookie("token");
    next();
  }
};
module.exports.verifyToken = verifyToken;
module.exports.verifyTokenForWs = verifyTokenForWs;
