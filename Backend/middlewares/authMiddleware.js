const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization || "";
  if (!authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required." });
  }
  try {
    const decoded = jwt.verify(authorization.slice(7), process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.isBlocked) return res.status(401).json({ message: "Access denied." });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
});

const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Administrator access required." });
  }
  next();
};

module.exports = { authMiddleware, isAdmin };
