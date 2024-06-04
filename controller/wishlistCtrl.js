const Wishlist = require("../models/wishlistModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const addWishlist = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  const { productId } = req.body;
  try {
    let wishlistItem = await Wishlist.findOne({ userId: id });
    if (!wishlistItem) {
      wishlistItem = new Wishlist({
        items: [],
        userId: id,
      });
    }

    const existingItem = wishlistItem.items.find((id) => id.toString() === productId);
    if (existingItem) throw new Error("Product already in wishlist");

    wishlistItem.items.push(productId);

    await wishlistItem.save();

    res.json(wishlistItem);
  } catch (error) {
    throw new Error(error);
  }
});

const getWishlist = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  try {
    const getWishlist = await Wishlist.findOne({ userId: id }).populate("items");
    res.json(getWishlist);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteWishlist = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  const { productId } = req.params;
  validateMongodbId(id);
  try {
    const getWishlist = await Wishlist.findOne({ userId: id });
    getWishlist.items = getWishlist.items.filter((id) => id.toString() !== productId);
    await getWishlist.save();
    res.json(getWishlist);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { addWishlist, getWishlist, deleteWishlist };
