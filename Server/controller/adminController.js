const express = require("express");
const adminController = express();
const User = require("../model/user");
const cookieParser = require("cookie-parser");
const Video = require("../model/video");
const { google } = require("googleapis");
const fs = require("fs");
const { gmail } = require("googleapis/build/src/apis/gmail");
// const multer = require("multer");

adminController.use(express.json());
adminController.use(express.urlencoded({ extended: false }));
adminController.use(cookieParser());
// // pandeyrajeshraj21@gmail.com
const CLIENT_ID =
  "823512880578-e04u338ijsmoomvi166lvs7n3n7u69j9.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04uGsh1gVb8jACgYIARAAGAQSNwF-L9IruoYtSbtZM3htUMrvRBJlJTN4x3K_Cv7QIiznMxE7Iwpm37A5S7Go7841eyDx7cii1Uk";
const SCOPE = "https://www.googleapis.com/auth/youtube.upload";

// const CLIENT_ID =
//   "1022129594616-idgg5q0mi59anklne5tvfjfp49rfe6cm.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";
// const REFRESH_TOKEN =
//   "1//04uGsh1gVb8jACgYIARAAGAQSNwF-L9IruoYtSbtZM3htUMrvRBJlJTN4x3K_Cv7QIiznMxE7Iwpm37A5S7Go7841eyDx7cii1Uk";
// const SCOPE = "https://www.googleapis.com/auth/youtube.upload";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN, scope: SCOPE });

////////----------------User work----------------////////
////------------------------get dashboard------------------------////
exports.dashboard = async (req, res) => {
  try {
    res.status(200).json({
      status: "ok",
      message: "dashboard",
    });
  } catch (err) {
    console.log(err);
  }
};

//////////////////////////////////////////////////////////////////////////////////////
// crud operation for videos in admin panel-----------------------
//////////////////////////////////////////////////////////////////////////////////////

////------------------------ delete user ------------------------////
exports.deleteUser = async (req, res) => {
  try {
    const data = await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({
      status: "ok",
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
};

// ////------------------------ get all user ------------------------////
exports.allUser = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json({
      status: "ok",
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
};

//////////////////////////////////////////////////////////////////////////////////////
// --------------------crud operation for videos in admin panel-----------------------
//////////////////////////////////////////////////////////////////////////////////////
///////-----------------!!!!!!!!!!!!!!!-----------------/////

// Upload video to Cloudflare Stream
exports.uploadCourse = async (req, res) => {
  const youtube = google.youtube({ version: "v3", auth: oauth2Client });
  const { title, description } = req.body;
  const videoPath = req.file.path;

  try {
    // Fetch the list of supported video categories
    const categoryResponse = await youtube.videoCategories.list({
      part: "snippet",
      regionCode: "US", // Provide a region code to ensure correct localization
    });

    // Find the category ID based on the category title "Educational"
    const educationalCategory = categoryResponse.data.items.find(
      (item) => item.snippet.title === "Education"
    );

    if (!educationalCategory) {
      console.error("Educational category not found.");
      return;
    }

    // Use the found category ID
    const categoryId = educationalCategory.id;

    const videoMetadata = {
      snippet: {
        title: title,
        description: description,
        categoryId: categoryId,
      },
      status: {
        privacyStatus: "unlisted",
      },
    };

    const videoParams = {
      part: "snippet,status",
      requestBody: videoMetadata,
      media: {
        body: fs.createReadStream(videoPath),
      },
    };

    const response = await youtube.videos.insert(videoParams);
    const videoUrl = `https://www.youtube.com/watch?v=${response.data.id}`;

    console.log("Video uploaded successfully!");
    console.log("Video ID:", response.data.id);
    console.log("Video URL:", videoUrl);
    console.log("Category ID:", categoryId); // Log the categoryId
    const video = new Video({
      title,
      description,
      videoId: response.data.id,
      videoLink: videoUrl,
    });

    await video.save();
    console.log("Video saved to database!");
    console.log(video);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error uploading video:", error.message);
    res.sendStatus(500);
  }
};

// ////------------------------ get all courses courses------------------------////
exports.courses = async (req, res) => {
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

// // ----------------------update the title and description--------------------

exports.updateCourse = async (req, res) => {
  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  try {
    const videoId = req.params.videoId;
    let video = await Video.findOne({ videoId: videoId });

    if (!video) {
      console.error("Video not found in the database.");
      res.status(404).send("Video not found in the database");
      return;
    }
    const { title, description } = req.body;
    await Video.findOneAndUpdate({ videoId: videoId }, { title, description });

    // Now you have the video document, you can access its properties
    const { categoryId } = video;
    const categoryResponse = await youtube.videoCategories.list({
      part: "snippet",
      regionCode: "US", // Provide a region code to ensure correct localization
    });

    // Find the category ID based on the category name or other criteria
    const categoryItem = categoryResponse.data.items.find(
      (item) => item.snippet.title === categoryId
    );

    if (!categoryItem) {
      console.error("Category not found.");
      return;
    }

    // Use the found category ID
    const updatedCategoryId = categoryItem.id;

    const videoMetadata = {
      id: videoId, // Video ID to update
      snippet: {
        title: title,
        description: description,
        categoryId: updatedCategoryId, // Specify the category ID here
      },
      // Specify any additional fields you want to update
    };

    const response = await youtube.videos.update({
      part: "snippet", // Parts you are updating, could also include 'status' etc.
      requestBody: videoMetadata,
    });

    console.log("Video updated successfully");
    console.log(response.data);
    res.sendStatus(200).json({
      status: "ok",
      message: "video updated successfully",
    });
    // You can save the updated information or further process it here
  } catch (error) {
    console.error("Error updating video:", error.message);
  }
};

// // ////------------------------ delete video ------------------------////

exports.deleteCourse = async (req, res) => {
  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  const videoId = req.params.videoId;

  try {
    // Delete the video from YouTube
    await youtube.videos.delete({
      id: videoId,
    });
    console.log(
      `Video with ID ${videoId} was deleted successfully from YouTube.`
    );

    // Delete the video document from the database
    await Video.findOneAndDelete({ videoId: videoId });
    console.log(
      `Video with ID ${videoId} was deleted successfully from the database.`
    );

    res
      .status(200)
      .send("Video deleted successfully from both YouTube and the database");
  } catch (error) {
    console.error("Error deleting video:", error.message);
    res.status(500).send("Error deleting video");
  }
};
// // ////------------------------ fuzzy search algorithm ------------------------////
