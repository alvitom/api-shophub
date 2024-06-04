const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    order: [
      {
        items: [
          {
            productId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
            },
          },
        ],
        finalAmount: Number,
        orderStatus: {
          type: String,
          default: "Menunggu Pembayaran",
          enum: ["Menunggu Pembayaran", "Dikemas", "Dikirim", "Selesai", "Dibatalkan", "Pengembalian"],
        },
        shippingAddress: {
          name: {
            type: String,
            required: true,
          },
          mobile: {
            type: String,
            required: true,
          },
          province: {
            type: String,
            required: true,
          },
          city: {
            type: String,
            required: true,
          },
          subdistrict: {
            type: String,
            required: true,
          },
          postCode: {
            type: String,
            required: true,
          },
          detail: {
            type: String,
            required: true,
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
