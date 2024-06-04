const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var checkoutSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        variant: String,
        totalProductPrice: Number,
      },
    ],
    total: Number,
    totalAfterDiscount: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Checkout", checkoutSchema);
