const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const addCartItem = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  const { product } = req.body;
  try {
    let cart = await Cart.findOne({ userId: id });

    if (!cart) {
      cart = new Cart({
        items: [],
        userId: id,
      });
    }

    const existingItem = cart.items.find((item) => item.productId.toString() === product.productId);
    if (existingItem) throw new Error("Product already in cart");

    cart.items.push(product);

    await cart.save();

    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const getCartItem = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  try {
    const cart = await Cart.findOne({ userId: id }).populate("items.productId");
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const increaseQuantity = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  const { productId } = req.body;
  try {
    const product = await Product.findById(productId);
    const cart = await Cart.findOne({ userId: id });
    cart.items = cart.items.map((item) => {
      if (item.productId.toString() === productId) {
        if (item.quantity < product.stock) {
          return { ...item, quantity: (item.quantity += 1) };
        } else {
          throw new Error("Quantity is maximum");
        }
      } else {
        return item;
      }
    });
    await cart.save();
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const decreaseQuantity = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  const { productId } = req.body;
  try {
    const cart = await Cart.findOne({ userId: id });
    cart.items = cart.items.map((item) => {
      if (item.productId.toString() === productId) {
        if (item.quantity > 1) {
          return { ...item, quantity: (item.quantity -= 1) };
        } else {
          throw new Error("Quantity is minimum");
        }
      } else {
        return item;
      }
    });
    await cart.save();
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCartItem = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  const { productId } = req.params;
  try {
    const cart = await Cart.findOne({ userId: id });

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

    await cart.save();

    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { addCartItem, getCartItem, increaseQuantity, decreaseQuantity, deleteCartItem };
