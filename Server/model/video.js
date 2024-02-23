const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  fileType: {
    type: String, // Assuming Video is a string representing the file type
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  driveFileId: {
    type: String, // Store the Google Drive file ID here
    required: true,
  },
  // driveWebViewLink: {
  //   type: String, // Store the Google Drive web view link here
  //   required: true,
  // },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
