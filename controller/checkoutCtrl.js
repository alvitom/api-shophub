const Checkout = require("../models/checkoutModel");
const Product = require("../models/productModel");
const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const addCheckoutItem = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  const { items } = req.body;
  try {
    let checkout = await Checkout.findOne({ userId: id });

    let products = [];
    let total = 0;

    for (let i = 0; i < items.length; i++) {
      let object = {};
      object.productId = items[i].id;
      object.quantity = items[i].quantity;
      object.variant = items[i].variant;
      const getPrice = await Product.findById(items[i].id).select("price").exec();
      object.totalProductPrice = getPrice.price * items[i].quantity;
      total += object.totalProductPrice;
      products.push(object);
    }

    if (!checkout) {
      checkout = new Checkout({
        items: products,
        userId: id,
        total,
      });
    }

    await checkout.save();
    res.json(checkout);
  } catch (error) {
    throw new Error(error);
  }
});

const getCheckoutItem = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  try {
    const checkout = await Checkout.findOne({ userId: id }).populate("items.productId");
    res.json(checkout);
  } catch (error) {
    throw new Error(error);
  }
});

const applyCoupon = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  const { couponName } = req.body;
  try {
    const coupon = await Coupon.findOne({ name: couponName });
    if (!coupon) throw new Error("Invalid coupon");
    const { total } = await Checkout.findOne({ userId: id }).populate("items.productId");
    const totalAfterDiscount = total - total * (coupon.discount / 100).toFixed(2);
    await Checkout.findOneAndUpdate(
      { userId: id },
      {
        totalAfterDiscount,
      },
      {
        new: true,
      }
    );
    res.json({ totalBeforeDiscount: total, totalAfterDiscount });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { addCheckoutItem, getCheckoutItem, applyCoupon };
