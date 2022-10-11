"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _productModel = _interopRequireDefault(require("../models/productModel.js"));

var _userModel = _interopRequireDefault(require("../models/userModel.js"));

var _data = _interopRequireDefault(require("../data.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var seedRouter = _express["default"].Router();

seedRouter.get("/", function _callee(req, res) {
  var createdProducts, createdUsers;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_productModel["default"].remove({}));

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(_productModel["default"].insertMany(_data["default"].products));

        case 4:
          createdProducts = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(_userModel["default"].remove({}));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_userModel["default"].insertMany(_data["default"].users));

        case 9:
          createdUsers = _context.sent;
          res.send({
            createdProducts: createdProducts,
            createdUsers: createdUsers
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
});
var _default = seedRouter;
exports["default"] = _default;