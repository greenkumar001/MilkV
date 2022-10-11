"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuth = exports.generateToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var generateToken = function generateToken(user) {
  return _jsonwebtoken["default"].sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
};

exports.generateToken = generateToken;

var isAuth = function isAuth(req, res, next) {
  var authorization = req.headers.authorization;

  if (authorization) {
    var token = authorization.slice(7, authorization.length);

    _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET, function (err, decode) {
      if (err) {
        res.status(401).send({
          message: "Invalid Token"
        });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({
      message: "No Token"
    });
  }
};

exports.isAuth = isAuth;