const jwt = require("jsonwebtoken");
const User = require("../model/user");

const adminAuth = async (req, res, next) => {
  try {
    // Ensure that req.cookies is defined before accessing req.cookies.jwt
    const token = req.cookies && req.cookies.jwt;

    if (!token) {
      throw new Error("No JWT cookie found");
      cd;
    }

    const verifyUser = jwt.verify(token, "mynameisrajeshrajpandey");

    if (!verifyUser) {
      throw new Error("Token verification failed");
    }

    const user = await User.findOne({ _id: verifyUser._id });

    if (!user) {
      throw new Error("User not found");
    }

    req.token = token;
    req.user = user;

    if (!user.isAdmin) {
      throw new Error("User is not authorized as admin");
    }

    next();
  } catch (err) {
    console.error("Authentication Error:", err);
    res.status(401).json({
      status: "fail",
      message: "Unauthorized",
      error: err.message, // Include the error message for debugging
    });
  }
};

module.exports = adminAuth;
