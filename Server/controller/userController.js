const express = require("express");
const userController = express();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const Contact = require("../model/contact");
const Video = require("../model/video");
userController.use(express.json());
userController.use(express.urlencoded({ extended: false }));
userController.use(cookieParser());

////------------------------signUp------------------------////

exports.signup = async (req, res) => {
  try {
    const data = await new User(req.body);
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ error: "Email address already in use" });
    }
    await data.save();
    const token = await data.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date((Date.now() / +60) * 60 * 90 * 24),
      httpOnly: true,
    });
    res.json({ status: "ok", data: data });
  } catch (err) {
    console.log(err);
  }
};

//// ------------------------home------------------------////
exports.home = async (req, res) => {
  try {
    res.status(200).json({ status: "ok", message: "home" });
  } catch (err) {
    console.log(err);
  }
};
////------------------------login------------------------////
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // generate token
    const token = await user.generateAuthToken();

    // create cookie
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 60 * 60 * 90 * 24),
      // httpOnly: true,
    });

    console.log("Login successful"); // Debug statement

    res.status(200).json({ status: "success", token });
  } catch (err) {
    console.error("Error:", err); // Debug statement
    res.status(400).json({ status: "fail from catch", err });
  }
};

////------------------------secure------------------------////
exports.secure = async (req, res) => {
  try {
    const name = req.user.name;
    // const email = req.user.email;
    res.status(200).json({ status: "ok", data: name });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "try again ",
    });
    // res.status(404).send("password or email not match!");
  }
};
////------------------------logout------------------------////
exports.logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      status: "success",
      message: "logout successful",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "try again ",
    });
    // res.status(404).send("password or email not match!");
  }
};
////////////////////////////////////////////////////////////////////////////////////////
// subscription
////------------------------subscribe------------------------////
exports.subscribe = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have middleware to extract the user from the request
    const videoId = req.params.videoId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the video is already subscribed
    if (user.subscribedVideos.includes(videoId)) {
      return res
        .status(400)
        .json({ error: "Already subscribed to this video" });
    }

    // Add the video to the user's subscribed videos
    user.subscribedVideos.push(videoId);
    await user.save();

    res.status(200).json({ message: "Subscribed successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

////------------------------unsubscribe------------------------////
// Assuming you have your User model imported as User

exports.unsubscribe = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have middleware to extract the user from the request
    const videoId = req.params.videoId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the video is subscribed
    if (!user.subscribedVideos.includes(videoId)) {
      return res.status(400).json({ error: "Not subscribed to this video" });
    }

    // Remove the video from the user's subscribed videos
    user.subscribedVideos = user.subscribedVideos.filter(
      (id) => id.toString() !== videoId.toString()
    );
    await user.save();

    res.status(200).json({ message: "Unsubscribed successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//                     Get Subscribed Videos
// =============//////////////////===============
exports.getUserSubscriptions = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const subscribedVideos = user.subscribedVideos;
    console.log(subscribedVideos);

    // Use Video.find() with $in to find videos by their IDs
    const subscribedVideosData = await Video.find({
      _id: { $in: subscribedVideos },
    });

    console.log(subscribedVideosData);

    res.status(200).json({ subscribedVideosData });
  } catch (error) {
    console.error("Error retrieving subscriptions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

////------------------------get Perticular Course by Id------------------------////

exports.getVideo = async (req, res) => {
  try {
    // Extract the videoId from the request parameters
    const videoId = req.params.videoId;

    // Use the Video model to find the video by its ID
    const video = await Video.findById(videoId);

    // Check if the video exists
    if (!video) {
      // If the video is not found, send a 404 Not Found response
      return res.status(404).json({ error: "Video not found" });
    }

    // If the video is found, send a JSON response with the video data
    res.status(200).json({ status: "success", video });
  } catch (error) {
    // If any error occurs, send a 500 Internal Server Error response
    console.error("Error fetching video:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

////------------------------get all courses ------------------------////

exports.allVideos = async (req, res) => {
  const courses = await Video.find();
  try {
    res.status(200).json({
      status: "ok",
      message: courses,
    });
  } catch (err) {
    console.log(err);
  }
};

//                 User Contact Form Handler
// =============//////////////////===============
exports.contact = async (req, res) => {
  try {
    const contact = await new Contact(req.body);
    await contact.save();

    res.status(200).json({ status: "ok", message: contact });
  } catch (err) {
    console.log(err);
  }
};
