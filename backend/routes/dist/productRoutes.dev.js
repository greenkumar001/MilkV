"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _userModel = _interopRequireDefault(require("../models/userModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var productRouter = _express["default"].Router();

productRouter.get("/", function _callee(req, res) {
  var products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_userModel["default"].find());

        case 2:
          products = _context.sent;
          res.send(products);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
productRouter.get("/search", (0, _expressAsyncHandler["default"])(function _callee2(req, res) {
  var query, pageSize, page, category, price, rating, order, searchQuery, queryFilter, categoryFilter, ratingFilter, priceFilter, sortOrder, products, countProducts;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          query = req.query;
          pageSize = query.pageSize || PAGE_SIZE;
          page = query.page || 1;
          category = query.category || "";
          price = query.price || "";
          rating = query.rating || "";
          order = query.order || "";
          searchQuery = query.query || "";
          queryFilter = searchQuery && searchQuery !== "all" ? {
            name: {
              $regex: searchQuery,
              $options: "i"
            }
          } : {};
          categoryFilter = category && category !== "all" ? {
            category: category
          } : {};
          ratingFilter = rating && rating !== "all" ? {
            rating: {
              $gte: Number(rating)
            }
          } : {};
          priceFilter = price && price !== "all" ? {
            // 1-50
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1])
            }
          } : {};
          sortOrder = order === "featured" ? {
            featured: -1
          } : order === "lowest" ? {
            price: 1
          } : order === "highest" ? {
            price: -1
          } : order === "toprated" ? {
            rating: -1
          } : order === "newest" ? {
            createdAt: -1
          } : {
            _id: -1
          };
          _context2.next = 15;
          return regeneratorRuntime.awrap(_userModel["default"].find(_objectSpread({}, queryFilter, {}, categoryFilter, {}, priceFilter, {}, ratingFilter)).sort(sortOrder).skip(pageSize * (page - 1)).limit(pageSize));

        case 15:
          products = _context2.sent;
          _context2.next = 18;
          return regeneratorRuntime.awrap(_userModel["default"].countDocuments(_objectSpread({}, queryFilter, {}, categoryFilter, {}, priceFilter, {}, ratingFilter)));

        case 18:
          countProducts = _context2.sent;
          res.send({
            products: products,
            countProducts: countProducts,
            page: page,
            pages: Math.ceil(countProducts / pageSize)
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  });
}));
productRouter.get("/categories", (0, _expressAsyncHandler["default"])(function _callee3(req, res) {
  var categories;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_userModel["default"].find().distinct("category"));

        case 2:
          categories = _context3.sent;
          res.send(categories);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}));
productRouter.get("/slug/:slug", function _callee4(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            slug: req.params.slug
          }));

        case 2:
          product = _context4.sent;

          if (product) {
            res.send(product);
          } else {
            res.status(404).send({
              message: "Product not found"
            });
          }

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
productRouter.get("/:id", function _callee5(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_userModel["default"].findById(req.params.id));

        case 2:
          product = _context5.sent;

          if (product) {
            res.send(product);
          } else {
            res.status(404).send({
              message: "Product not found"
            });
          }

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
});
var _default = productRouter;
exports["default"] = _default;