import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // 🔗 Kis order ka payment hai
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },

    // 💰 Amount paid
    amount: {
      type: Number,
      required: true
    },

    // 💳 Payment method
    paymentMethod: {
      type: String,
      enum: ["mock", "razorpay", "stripe", "cod"],
      default: "mock"
    },

    // 🧾 Transaction ID
    transactionId: {
      type: String,
      required: true
    },

    // 📌 Payment Status
    status: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "success"
    },

    // ⏰ Payment time
    paidAt: {
      type: Date,
      default: Date.now
    }

  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);