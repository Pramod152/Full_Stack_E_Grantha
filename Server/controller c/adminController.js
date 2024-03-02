const express = require("express");
const adminController = express();
const User = require("../model/user");
const cookieParser = require("cookie-parser");
const cloudflare = require("cloudflare");
const Video = require("../model/video");
const { Readable } = require("stream");

adminController.use(express.json());
adminController.use(express.urlencoded({ extended: false }));
adminController.use(cookieParser());

// Initialize Cloudflare
const cf = cloudflare({
  token: "pkSKCId5YCoRg7w8sKO_CSJCt8nqVBZYVDWcuuwG", // Your Cloudflare API token
});

// CRUD operations for videos in the admin panel

// Upload video to Cloudflare Stream
exports.uploadCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const fileData = req.file;

    // Upload file to Cloudflare Stream
    const streamResponse = await cf.stream.upload({
      title: title,
      description: description,
      file: fileData.buffer, // Assuming fileData is a Buffer containing the file content
      type: "video/mp4", // Adjust as needed
    });

    console.log("Video uploaded to Cloudflare Stream:", streamResponse);

    // Create a new Video document
    const newVideo = new Video({
      fileType: "video/mp4", // Adjust as needed
      title: title,
      description: description,
      driveFileId: streamResponse.result.uid, // Use the obtained UID
      // Optionally, you can store other information like web view link, etc.
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

// Get all courses
exports.courses = async (req, res) => {
  try {
    const videos = await Video.find();

    // Prepare response data
    const responseData = [];

    // Retrieve videos from Cloudflare Stream
    for (const video of videos) {
      const streamResponse = await cf.stream.get(video.driveFileId);
      responseData.push(streamResponse);
    }

    // Send response
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Edit video content
exports.updateCourse = async (req, res) => {
  const videoId = req.params.videoId;
  const { title, description } = req.body;
  try {
    console.log(videoId);
    // Update video metadata in Cloudflare Stream
    const streamResponse = await cf.stream.update(videoId, {
      title: title,
      description: description,
    });
    console.log("Stream updated:", streamResponse);

    res.status(200).json({ message: "Course updated successfully" });
  } catch (error) {
    console.error("Error updating video:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete video
exports.deleteCourse = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    console.log(videoId);
    // Delete video from Cloudflare Stream
    const streamResponse = await cf.stream.delete(videoId);
    console.log("Stream deleted:", streamResponse);

    // Delete video from the database
    await Video.deleteOne({ driveFileId: videoId });

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
