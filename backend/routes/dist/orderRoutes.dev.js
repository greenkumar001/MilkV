"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _orderModel = _interopRequireDefault(require("../models/orderModel.js"));

var _utils = require("../utils.js");

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var orderRouter = _express["default"].Router();

orderRouter.post("/", _utils.isAuth, (0, _expressAsyncHandler["default"])(function _callee(req, res) {
  var newOrder, order;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          newOrder = new _orderModel["default"]({
            orderItems: req.body.orderItems.map(function (x) {
              return _objectSpread({}, x, {
                product: x._id
              });
            }),
            shippingAddress: res.body.shippingAddress,
            paymentMethd: req.body.paymentMethd,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id
          });
          _context.next = 3;
          return regeneratorRuntime.awrap(newOrder.save());

        case 3:
          order = _context.sent;
          res.status(201).send({
            message: "New Order Created",
            order: order
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}));
orderRouter.get("/mine", _utils.isAuth, (0, _expressAsyncHandler["default"])(function _callee2(req, res) {
  var orders;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_orderModel["default"].find({
            user: req.user._id
          }));

        case 2:
          orders = _context2.sent;
          res.send(orders);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}));
orderRouter.get("/:id", _utils.isAuth, (0, _expressAsyncHandler["default"])(function _callee3(req, res) {
  var order;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_orderModel["default"].findById(req.params.id));

        case 2:
          order = _context3.sent;

          if (order) {
            res.send(order);
          } else {
            res.status(404).send({
              message: "Order Not Found"
            });
          }

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}));
orderRouter.put("/:id/pay", _utils.isAuth, (0, _expressAsyncHandler["default"])(function _callee4(req, res) {
  var order, updatedOrder;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_orderModel["default"].findById(req.params.id));

        case 2:
          order = _context4.sent;

          if (!order) {
            _context4.next = 13;
            break;
          }

          order.isPaid = true;
          order.paidAt = Date.now();
          order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
          };
          _context4.next = 9;
          return regeneratorRuntime.awrap(order.save());

        case 9:
          updatedOrder = _context4.sent;
          res.send({
            message: "Order Paid",
            order: updatedOrder
          });
          _context4.next = 14;
          break;

        case 13:
          res.status(404).send({
            message: "Order Not Found"
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  });
}));
var _default = orderRouter;
exports["default"] = _default;