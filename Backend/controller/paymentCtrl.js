const Razorpay = require("razorpay");
const crypto = require("crypto");
const Cart = require("../models/cartModel");

const getRazorpayClient = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    const error = new Error("Razorpay is not configured.");
    error.statusCode = 503;
    throw error;
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

const getCartTotal = (cart) => {
  if (!cart.length || cart.some((item) => !item.productId ||
      !Number.isInteger(item.quantity) || item.quantity <= 0 ||
      !Number.isFinite(item.productId.price) || item.productId.price < 0)) return 0;
  return cart.reduce((sum, item) => sum + item.quantity * item.productId.price, 0);
};

const verifyPaymentSignature = (orderId, paymentId, signature) => {
  if (![orderId, paymentId, signature].every((value) => typeof value === "string" && value.length)) return false;
  if (!process.env.RAZORPAY_KEY_SECRET) return false;
  const digest = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`).digest("hex");
  const expected = Buffer.from(digest, "hex");
  const received = Buffer.from(signature, "hex");
  return received.length === expected.length && crypto.timingSafeEqual(expected, received);
};

const checkout = async (req, res, next) => {
  try {
    const cart = await Cart.find({ userId: req.user._id }).populate("productId");
    const total = getCartTotal(cart);
    if (!total) return res.status(400).json({ message: "Your cart is empty or invalid." });
    const order = await getRazorpayClient().orders.create({
      amount: Math.round((total + 100) * 100),
      currency: "INR",
    });
    res.json({ success: true, order, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (error) { next(error); }
};

const paymentVerification = async (req, res, next) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
    if (!verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature)) {
      return res.status(400).json({ message: "Invalid payment signature." });
    }
    const payment = await getRazorpayClient().payments.fetch(razorpayPaymentId);
    if (payment.order_id !== razorpayOrderId || payment.status !== "captured") {
      return res.status(400).json({ message: "Payment not captured." });
    }
    res.json({ razorpayOrderId, razorpayPaymentId, razorpaySignature });
  } catch (error) { next(error); }
};

module.exports = { checkout, paymentVerification, getRazorpayClient, verifyPaymentSignature, getCartTotal };
