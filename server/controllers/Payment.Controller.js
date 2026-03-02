import crypto from "crypto";
import Payment from "../models/Payment.model.js";
import Order from "../models/Order.model.js";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

export const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    // 🛑 Validation
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !orderId
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    // 🔐 Verify Razorpay Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // 🔎 Find Order
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // 🛑 Already Paid
    if (order.payment) {
      return res.json({
        success: true,
        message: "Payment already processed",
      });
    }

    // 🛑 Duplicate Transaction Check
    const existingPayment = await Payment.findOne({
      transactionId: razorpay_payment_id,
    });

    if (existingPayment) {
      return res.json({
        success: true,
        message: "Payment already recorded",
      });
    }

    // 💾 Save Payment
    const payment = await Payment.create({
      order: order._id,
      amount: order.totalAmount,
      paymentMethod: "razorpay",
      transactionId: razorpay_payment_id,
      status: "success",
    });

    // 🔻 Reduce Product Stock
    for (let item of order.items) {
      await Product.updateOne(
        { _id: item.product },
        { $inc: { stock: -item.quantity } }
      );
    }

    // 🔄 Update Order
    order.payment = payment._id;
    order.orderStatus = "Processing";
    await order.save();

    // 🛒 ✅ CLEAR CART USING ORDER.USER
    await Cart.deleteOne({ user: order.user });

    return res.json({
      success: true,
      message: "Payment verified & cart cleared successfully",
    });

  } catch (error) {
    console.error("Payment Verify Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};