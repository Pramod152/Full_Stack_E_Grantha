const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  fileType: {
    type: String,
    required: true,
    default: "video",
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
  videoId: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
    default: "Education",
  },
  thumbnailPath: {
    type: String, // Change the type to String to store the path
    // required: true,
  },
  thumbnailUrl: {
    type: String,
    // required: true,
  },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;