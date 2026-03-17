import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // 👤 Customer (User ya Guest)
   user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},

    guestId: {
      type: String,
      default: null
    },

    // 🛍 Ordered Products (Snapshot Data - Important)
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },

        title: {
          type: String,
          required: true
        },

        // ✅ ADD SLUG (NEW)
        slug: {
          type: String,
          required: true
        },

        sku: {
          type: String,
          required: true
        },

        image: {
          type: String,
          required: true
        },

        quantity: {
          type: Number,
          required: true,
          min: 1
        },

        price: {
          type: Number,
          required: true
        },

        subtotal: {
          type: Number,
          required: true
        }
      }
    ],

    // 🚚 Shipping Address
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      addressLine: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, default: "India" }
    },

    // 💰 Final Order Amount
    totalAmount: {
      type: Number,
      required: true
    },

    // 💳 Payment Reference
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      default: null
    },

    // 📦 Order Status Lifecycle
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);