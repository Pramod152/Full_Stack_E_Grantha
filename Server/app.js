const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors());

const adminRouter = require("./router/adminRouter");
const userRouter = require("./router/userRouter");
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// ----------router for admin-----------//
// Allow requests from specific origins with credentials
app.use(
  cors({
    origin: "*", // Replace this with the origin of your frontend application
    credentials: true,
  })
);

app.use("/E-Grantha/admin", adminRouter);

//---------- router for client-----------//
app.use("/E-Grantha/user", userRouter);

module.exports = app;
