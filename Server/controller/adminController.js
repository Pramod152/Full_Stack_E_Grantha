const express = require("express");
const adminController = express();
const User = require("../model/user");
const cookieParser = require("cookie-parser");
const Video = require("../model/video");
const { google } = require("googleapis");
const fs = require("fs");
const Contact = require("../model/contact");
// const Admin = require("../model/admin");

adminController.use(express.json());
adminController.use(express.urlencoded({ extended: false }));
adminController.use(cookieParser());
// // pandeyrajeshraj21@gmail.com
const CLIENT_ID =
  "823512880578-e04u338ijsmoomvi166lvs7n3n7u69j9.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04BYHGPpnBFRWCgYIARAAGAQSNwF-L9Irx1hrO2GC8AyvynzopwUSM_H6nnJ1_pCPykUG-ihvaVfLHq3fgknYUa4JrO6MT4UW7kw";
const SCOPE = "https://www.googleapis.com/auth/youtube.upload";

////////////////---E-grantha gmail account---////////////////
// const CLIENT_ID =
//   "896014529303-ac9dm0ino09r4rvqn2ba77aob3fel8ns.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";
// const REFRESH_TOKEN =
//   "1//04RIAQQ9YZgO-CgYIARAAGAQSNwF-L9IrVs0akeUhxfGH9qWVy7DDMdQeKLyCMhhPq9ekMqdCtUoVMyE8xgjgguO82tsStxm6lJI";
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

// Get a single user by ID
exports.getUser = async (req, res) => {
  try {
    const data = await User.findById(req.params.userId);
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
// Upload video to Youtube and save to database
// Upload video to Youtube and save to database
const sharp = require("sharp");
exports.uploadCourse = async (req, res) => {
  const youtube = google.youtube({ version: "v3", auth: oauth2Client });
  const { title, description } = req.body;
  const { videoPath, thumbnailPath } = req.files; // Destructure videoPath and thumbnailPath

  try {
    // Fetch the list of supported video categories
    const categoryResponse = await youtube.videoCategories.list({
      part: "snippet",
      regionCode: "US", // Provide a region code to ensure correct localization
    });

    // Find the category ID based on the category title "Education"
    const educationalCategory = categoryResponse.data.items.find(
      (item) => item.snippet.title === "Education"
    );

    if (!educationalCategory) {
      console.error("Educational category not found.");
      return res.status(500).send("Educational category not found");
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
        body: fs.createReadStream(videoPath[0].path), // Read the first video file path
      },
    };

    const response = await youtube.videos.insert(videoParams);
    const videoUrl = `https://www.youtube.com/watch?v=${response.data.id}`;

    console.log("Video uploaded successfully!");
    console.log("Video ID:", response.data.id);
    console.log("Video URL:", videoUrl);
    console.log("Category ID:", categoryId); // Log the categoryId

    // Upload the thumbnail
    const resizedThumbnail = await sharp(thumbnailPath[0].path)
      .resize({ width: 1280, height: 720 }) // Set the dimensions to 1280x720 or adjust as needed
      .toBuffer();

    // Upload the resized thumbnail
    const thumbnailParams = {
      videoId: response.data.id,
      media: {
        mimeType: "image/jpeg", // Assuming JPEG format for the thumbnail
        body: resizedThumbnail, // Use the resized thumbnail buffer
      },
    };

    await youtube.thumbnails.set(thumbnailParams);
    console.log("Thumbnail uploaded successfully!");

    // Instead of using thumbnailResponse, use thumbnailUrl directly
    const thumbnailUrl = `https://i.ytimg.com/vi/${response.data.id}/default.jpg`;

    // Save video information to the database
    const videoData = {
      title,
      description,
      videoId: response.data.id,
      videoLink: videoUrl,
      thumbnailPath: thumbnailPath[0].path, // Read the first thumbnail file path
      thumbnailUrl: thumbnailUrl, // Use thumbnailUrl directly
    };

    // Create a new Video document and save it to the database
    const videoDoc = new Video(videoData);
    await videoDoc.save();

    console.log("Video saved to database!");
    console.log(videoDoc);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).send("Error uploading video");
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

exports.contact = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.status(200).json({
      status: "ok",
      message: contact,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
    console.log(err);
  }
};

////------------------------ delete contact ------------------------////
exports.deleteContact = async (req, res) => {
  try {
    const data = await Contact.findByIdAndDelete(req.params.contactId);
    res.status(200).json({
      status: "ok",
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
};
// // ////------------------------ fuzzy search algorithm ------------------------////

exports.fuzzySearch = async (req, res) => {
  // Function to calculate Levenshtein distance
  function levenshteinDistance(s1, s2) {
    const m = s1.length;
    const n = s2.length;
    const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) {
      dp[i][0] = i;
    }

    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }

    return dp[m][n];
  }

  // Function to perform fuzzy search on documents with misspelling handling
  function fuzzySearch(query, documents, threshold) {
    const results = [];

    for (const doc of documents) {
      const titleWords = doc.title.toLowerCase().split(/\s+/);
      const descriptionWords = doc.description.toLowerCase().split(/\s+/);
      const queryWords = query.toLowerCase().split(/\s+/);

      let isMatch = false;

      for (const queryWord of queryWords) {
        let titleMatch = false;
        let descriptionMatch = false;

        for (const titleWord of titleWords) {
          if (titleWord.includes(queryWord)) {
            titleMatch = true;
            break;
          } else if (levenshteinDistance(titleWord, queryWord) <= threshold) {
            titleMatch = true;
            break;
          }
        }

        for (const descriptionWord of descriptionWords) {
          if (descriptionWord.includes(queryWord)) {
            descriptionMatch = true;
            break;
          } else if (
            levenshteinDistance(descriptionWord, queryWord) <= threshold
          ) {
            descriptionMatch = true;
            break;
          }
        }

        if (titleMatch || descriptionMatch) {
          isMatch = true;
          break;
        }
      }

      if (isMatch) {
        results.push({ document: doc });
      }
    }

    return results;
  }

  // Get the query and threshold from the request
  const query = req.query.q;
  const threshold = parseInt(req.query.threshold) || 1;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "q" is required.' });
  }

  try {
    // Fetch documents from the database
    const documents = await Video.find({}); // Fetch all for example, adjust as needed

    // Perform fuzzy search on fetched documents
    const results = fuzzySearch(query, documents, threshold);

    // Respond with the search results
    res.json({ results });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching documents." });
  }
};

////--------------------Register------------------------////
const Admin = require("../model/admin");
exports.signup = async (req, res) => {
  try {
    console.log(req.body);
    const data = await new Admin(req.body);
    const existingAdmin = await Admin.findOne({ email: req.body.email });

    if (existingAdmin) {
      return res.status(400).json({ error: "Email address already in use" });
    }
    await data.save();
    const token = await data.generateAuthToken();
    res.cookie("Admintoken", token, {
      expires: new Date((Date.now() / +60) * 60 * 90 * 24),
      httpOnly: true,
    });
    console.log("Admintoken set:", token); // Debug statement
    res.json({ status: "ok", data: data });
  } catch (err) {
    console.log(err);
  }
};

////------------------------login------------------------////
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = await user.generateAuthToken();

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 86400000), // 24 hours
      httpOnly: true,
    });

    console.log("Login successful");
    res.status(200).json({ status: "success", token });
  } catch (err) {
    console.error("Error:", err);
    res.status(400).json({ status: "fail", error: err.message });
  }
};
