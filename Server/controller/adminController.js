const express = require("express");
const adminController = express();
const User = require("../model/user");
const cookieParser = require("cookie-parser");
const { google } = require("googleapis");
const Video = require("../model/video");
const { Readable } = require("stream");

// const path = require("path");
// const fs = require("fs");
// const fs = require("fs");
// const { drive } = require("googleapis");
adminController.use(express.json());
adminController.use(express.urlencoded({ extended: false }));
adminController.use(cookieParser());

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

///////-----------------drive information to upload file-----------------/////

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

//////////////////////////////////////////////////////////////////////////////////////
// --------------------crud operation for videos in admin panel-----------------------
//////////////////////////////////////////////////////////////////////////////////////

///////-----------------!!!!!!!!!!!!!!!-----------------/////
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

////------------------------ get all user ------------------------////
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

////------------------------ upload video to google drive ------------------------////
exports.uploadCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const fileData = req.file;

    // Upload file to Google Drive
    const driveResponse = await drive.files.create({
      requestBody: {
        name: title, // Use the title as the file name
        mimeType: "video/mp4", // Use the provided file type
        parents: ["1vR7FUcu_0rSnuCjv8EKZZU6iYqpUKMXo"], // Use the appropriate folder ID
      },
      media: {
        mimeType: "video/mp4",
        body: Readable.from(fileData.buffer),
      },
    });

    // Extract the driveFileId from the response
    const driveFileId = driveResponse.data.id;

    console.log("Video uploaded to Google Drive:", driveResponse.data);

    // Create a new Video document with the obtained driveFileId
    const newVideo = new Video({
      fileType: "video/mp4", // Adjust as needed
      title: title,
      description: description,
      fileData: fileData.buffer, // Assuming fileData is a Buffer containing the file content
      driveFileId: driveFileId, // Use the obtained driveFileId
    });

    // Save the video document to the database
    await newVideo.save();

    res.status(200).json({
      status: "ok",
      message: "Video uploaded successfully",
      data: newVideo,
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to upload video",
      error: error.message,
    });
  }
};

////------------------------ get all courses courses------------------------////
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

// ////------------------------ edit video content------------------------////
exports.updateCourse = async (req, res) => {
  const videoId = req.params.videoId;
  const { title, description } = req.body;
  try {
    console.log(videoId);
    const document = await Video.findOneAndUpdate(
      { driveFileId: videoId },
      { title: title, description: description },
      { new: true }
    );
    // console.log(document);
    // console.log(title, description);
    res.status(200).json({ message: "Course updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ////------------------------ delete video ------------------------////
exports.deleteCourse = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    console.log(videoId);
    // delete video from database
    await Video.deleteOne({ driveFileId: videoId });
    // delete video from google drive
    const response = await drive.files.delete({
      fileId: videoId,
    });

    console.log(response.data, response.status);
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
