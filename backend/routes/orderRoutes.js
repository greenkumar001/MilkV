import express from "express";
import User from "../models/userModel.js";
import { generateToken } from "../utils.js";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const order = new Order({
      orderItems: req.body.orderItems.map((x) => ({
        ...x,
        product: x._id,
      })),
    });
  })
);

export default orderRouter;
