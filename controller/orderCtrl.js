const Product = require("../models/productModel");
const Checkout = require("../models/checkoutModel");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const createOrder = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  const { shippingAddress, shippingCosts } = req.body;
  try {
    let orders = await Order.findOne({ userId: id });

    if (!orders) {
      orders = new Order({
        userId: id,
        order: [],
      });
    }

    const checkout = await Checkout.findOne({ userId: id });
    let finalAmount = 0;
    if (checkout.totalAfterDiscount) {
      finalAmount += checkout.totalAfterDiscount + shippingCosts;
    } else {
      finalAmount += checkout.total;
    }

    let object = {};
    object.items = checkout.items;
    object.finalAmount = finalAmount;
    object.orderStatus = "Menunggu Pembayaran";
    object.shippingAddress = shippingAddress;

    orders.order.push(object);

    await orders.save();

    for (const item of checkout.items) {
      const productId = item.productId;
      const quantity = item.quantity;
      const product = await Product.findById(productId);
      product.stock -= quantity;
      await product.save();
    }

    for (const item of checkout.items) {
      const productId = item.productId;
      let cart = await Cart.findOne({ userId: id });
      cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
      await cart.save();
    }

    res.json(orders);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  try {
    const getOrders = await Order.findOne({ userId: id });
    res.json(getOrders);
  } catch (error) {
    throw new Error(error);
  }
});

const getDetailOrder = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  const { orderId } = req.params;
  validateMongodbId(orderId);
  try {
    const orders = await Order.findOne({ userId: id }).populate("order.items.productId");
    const getDetailOrder = orders.order.find((item) => item.id === orderId);
    res.json(getDetailOrder);
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const { status } = req.body;
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createOrder, getAllOrders, getDetailOrder, updateOrderStatus };
