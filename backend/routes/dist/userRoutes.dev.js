"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userModel = _interopRequireDefault(require("../models/userModel.js"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _utils = require("../utils.js");

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.post("/signin", (0, _expressAsyncHandler["default"])(function _callee(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            email: req.body.email
          }));

        case 2:
          user = _context.sent;

          if (!user) {
            _context.next = 7;
            break;
          }

          if (!_bcryptjs["default"].compareSync(req.body.password, user.password)) {
            _context.next = 7;
            break;
          }

          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: (0, _utils.generateToken)(user)
          });
          return _context.abrupt("return");

        case 7:
          res.status(401).send({
            message: "Invalid email or password"
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}));
userRouter.post("/signup", (0, _expressAsyncHandler["default"])(function _callee2(req, res) {
  var newUser, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          newUser = new _userModel["default"]({
            name: req.body.name,
            email: req.body.email,
            password: _bcryptjs["default"].hashSync(req.body.password)
          });
          _context2.next = 3;
          return regeneratorRuntime.awrap(newUser.save());

        case 3:
          user = _context2.sent;
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: (0, _utils.generateToken)(user)
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}));
userRouter.put("/profile", _utils.isAuth, (0, _expressAsyncHandler["default"])(function _callee3(req, res) {
  var user, updatedUser;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_userModel["default"].findById(req.user._id));

        case 2:
          user = _context3.sent;

          if (!user) {
            _context3.next = 13;
            break;
          }

          user.name = req.body.name || user.name;
          user.email = req.body.email || user.email;

          if (req.body.password) {
            user.password = _bcryptjs["default"].hashSync(req.body.password, 8);
          }

          _context3.next = 9;
          return regeneratorRuntime.awrap(user.save());

        case 9:
          updatedUser = _context3.sent;
          res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: (0, _utils.generateToken)(updatedUser)
          });
          _context3.next = 14;
          break;

        case 13:
          res.status(404).send({
            message: "User not found"
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  });
}));
var _default = userRouter;
exports["default"] = _default;