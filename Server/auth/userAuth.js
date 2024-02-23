// const jwt = require("jsonwebtoken");
// const User = require("./model/user");

// const auth = async (req, res, next) => {
//   // try {
//   //   const token = await req.cookies.jwt;
//   //   console.log(token);
//   //   const verifyUser = jwt.verify(token, "mynameisrajeshrajpandey");
//   //   console.log(verifyUser);
//   //   const user = await User.findOne({ _id: verifyUser._id });
//   //   req.token = token;
//   //   req.user = user;
//   //   console.log(user);
//   //   next();
//   // } catch (err) {
//   //   res.status(404).json({
//   //     status: "fail",
//   //     message: err,
//   //   });
//   //   // res.render("error");
//   // }

//   try {
//     const token = req.cookies.jwt;

//     if (!token) {
//       throw new Error("No JWT cookie found");
//     }

//     const verifyUser = jwt.verify(token, "mynameisrajeshrajpandey");

//     if (!verifyUser) {
//       throw new Error("Token verification failed");
//     }

//     const user = await User.findOne({ _id: verifyUser._id });

//     if (!user) {
//       throw new Error("User not found");
//     }

//     req.token = token;
//     req.user = user;

//     next();
//   } catch (err) {
//     console.error("Authentication Error:", err);
//     res.status(401).json({
//       status: "fail",
//       message: "Unauthorized",
//       error: err.message, // Include the error message for debugging
//     });
//   }
// };

// module.exports = auth;

// auth.js

// Import necessary modules
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const auth = async (req, res, next) => {
  try {
    // Ensure that req.cookies is defined before accessing req.cookies.jwt
    const token = req.cookies && req.cookies.jwt;

    if (!token) {
      throw new Error("No JWT cookie found");
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

module.exports = auth;
