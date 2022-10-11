"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _seedRoutes = _interopRequireDefault(require("./routes/seedRoutes.js"));

var _productRoutes = _interopRequireDefault(require("./routes/productRoutes.js"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes.js"));

var _orderRoutes = _interopRequireDefault(require("./routes/orderRoutes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_mongoose["default"].connect(process.env.MONGODB_URI).then(function () {
  console.log("connect to db");
})["catch"](function (err) {
  console.log(err.message);
});

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.get("/api/config/paypal", function (req, res) {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.use("/api/seed", _seedRoutes["default"]);
app.use("/api/products", _productRoutes["default"]);
app.use("/api/users", _userRoutes["default"]);
app.use("/api/orders", _orderRoutes["default"]);

var _dirname = _path["default"].resolve();

app.use(_express["default"]["static"](_path["default"].join(_dirname, "/frontend/build")));
app.get("*", function (req, res) {
  return res.sendFile(_path["default"].join(_dirname, "/frontend/build/index.html"));
});
app.use(function (err, req, res, next) {
  res.status(500).send({
    message: err.message
  });
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("Serve  at http://localhost:".concat(port, " "));
});