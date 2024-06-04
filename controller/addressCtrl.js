const Address = require("../models/addressModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const addAddressUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  const { address } = req.body;
  try {
    let addressUser = await Address.findOne({ userId: id });
    if (!addressUser) {
      addressUser = new Address({
        userId: id,
        address: [],
      });
    }
    addressUser.address.push(address);
    await addressUser.save();
    res.json(addressUser);
  } catch (error) {
    throw new Error(error);
  }
});

const getAddressUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  try {
    const addressUser = await Address.findOne({ userId: id });
    res.json(addressUser);
  } catch (error) {
    throw new Error(error);
  }
});

const updateAddressUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  const { addressId } = req.params;
  validateMongodbId(id);
  const { address } = req.body;
  try {
    let addressUser = await Address.findOne({ userId: id });
    addressUser.address = addressUser.address.map((item) => (item._id.toString() === addressId.toString() ? address : item));
    await addressUser.save();
    res.json(addressUser);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { addAddressUser, getAddressUser, updateAddressUser };
