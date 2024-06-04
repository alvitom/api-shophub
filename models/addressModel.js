const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: [
      {
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
    ],
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Address", addressSchema);
