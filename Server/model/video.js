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
  videoCategory: {
    type: String,
    required: true,
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
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
