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
/**
 * Authenticates user based on the jwt token.
 * 
 * @param {httpRequest} req request from http request, containing token and header to match user credentials
 * @param {httpContent} res response sent to route after middleware processing
 * @param {route} next to call the next middleware, i.e. to return back control to route which called this middleware for authentication
 */

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
