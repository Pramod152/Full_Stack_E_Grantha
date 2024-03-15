const jwt = require("jsonwebtoken");
const Admin = require("../model/admin");

const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.Admintoken;
    if (!token) {
      throw new Error("No JWT cookie found");
    }

    const verifyAdmin = jwt.verify(token, "mynameisrajeshrajpandey");
    if (!verifyAdmin) {
      throw new Error("Token verification failed");
    }

    const admin = await Admin.findOne({ _id: verifyAdmin._id });
    if (!admin) {
      throw new Error("Admin not found");
    }

    req.token = token;
    req.admin = admin;

    next();
  } catch (err) {
    console.error("Authentication Error:", err);
    res.status(401).json({
      status: "fail",
      message: "Unauthorized",
      error: err.message,
    });
  }
};

module.exports = adminAuth;
