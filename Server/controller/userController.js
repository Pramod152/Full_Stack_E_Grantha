const express = require("express");
const userController = express();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
userController.use(express.json());
userController.use(express.urlencoded({ extended: false }));
userController.use(cookieParser());

////------------------------signUp------------------------////

exports.sinup = async (req, res) => {
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

// // Client dashboard home
// app.get("/dashboard", auth, (req, res) => {
//   // Render client dashboard home, fetch and display subscribed videos
//   videoId: mongoose.Types.ObjectId("your_video_id_here"), ///fill this to link with video id to add subscription video to the user dashboard
//     res.render("dashboard/home", { user: req.user });
// });

// // Video details page
// app.get("/video/:videoId", auth, (req, res) => {
//   // Render video details page based on videoId
//   // You can fetch video details from the database
//   res.render("dashboard/video", { videoId: req.params.videoId });
// });

// =============//////////////////===============
const { google } = require("googleapis");
const Video = require("../model/video");

// Create a Google Drive client

const CLIENT_ID =
  "607703662588-0vc7r41ofmpebbkr3ubhimpmos6fkffm.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN =
  "1//044CdfKXs5T6rCgYIARAAGAQSNwF-L9IrpJCbH7cUDU5rLApF3oTebfG5Khf9_kqx9P5K2MZAGXui8mZ41JdiYrGdLsGeSLAhDLY";
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

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

//get all the data from the database related to video to render on the client side and display the video that is present in drive .the video should be presented in such a way that the driveFieldId presend in video document should be used to fetch the video from the drive and display it on the client side along with the video details like title,description,etc.
exports.allVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    const videoData = [];

    for (const video of videos) {
      const driveResponse = await drive.files.get(
        {
          fileId: video.driveFileId,
          alt: "media",
        },
        { responseType: "stream" }
      );

      const videoDetails = {
        title: video.title,
        description: video.description,
        // Add other video details as needed
      };
      // Set appropriate headers for the response
      // res.set("Content-Type", video.fileType);
      // res.set("Content-Disposition", `inline; filename="${video.title}"`);
      // Pipe the file content directly to the response
      // driveResponse.data.pipe(res);

      videoData.push({
        videoDetails,
        videoContent: driveResponse.data,
      });
    }

    res.status(200).json({ status: "ok", data: videoData });
  } catch (err) {
    console.log(err);
  }
};

/////////
// exports.allVideos = async (req, res) => {
//   try {
//     const videos = await Video.find();
//     const videoData = videos.map((video) => ({
//       title: video.title,
//       description: video.description,
//       videoUrl: `https://drive.google.com/file/d/${video.driveFileId}/preview`, // URL for viewing the video
//     }));

//     res.status(200).json({ status: "ok", data: videoData });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ status: "error", message: "Internal server error" });
//   }
// };
