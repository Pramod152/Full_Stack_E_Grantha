// const { google } = require("googleapis");
// const fs = require("fs");
// const express = require("express");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
// // Set up Express server
// const app = express();

// // // YouTube API credentials rajeshpandry24@gmail.com
// // const CLIENT_ID =
// //   "1069545703547-ti82ku91rfd8vj82j2fd1enbb8khjfuo.apps.googleusercontent.com";
// // const CLIENT_SECRET = "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";
// // const REDIRECT_URI = "https://developers.google.com/oauthplayground";

// // // Refresh token obtained after authorization
// // // const REFRESH_TOKEN =
// // //   "1//04YSmW8OqPPTECgYIARAAGAQSNwF-L9Iry5_7w_DmoUb5EFy6RqcLYFrYqhzbMt6RbX-fCHHf50ZobkjhV0pf0mzp-InLQMguQnE";
// // const REFRESH_TOKEN =
// //   "1//0f8gxIyzx0KsUCgYIARAAGA8SNwF-L9Ir3Xh8WK_ShGnkW3cRvPvzxZXtpmVAoy5oUMnupfYv3ZtwttaUxfh1JuklW8s9XTwGeEs";
// // const SCOPE = "https://www.googleapis.com/auth/youtube.upload";
// // YouTube API credentials
// const CLIENT_ID =
//   "823512880578-e04u338ijsmoomvi166lvs7n3n7u69j9.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";

// // Refresh token obtained after authorization
// // const REFRESH_TOKEN =
// //   "1//04YSmW8OqPPTECgYIARAAGAQSNwF-L9Iry5_7w_DmoUb5EFy6RqcLYFrYqhzbMt6RbX-fCHHf50ZobkjhV0pf0mzp-InLQMguQnE";
// const REFRESH_TOKEN =
//   "1//04uGsh1gVb8jACgYIARAAGAQSNwF-L9IruoYtSbtZM3htUMrvRBJlJTN4x3K_Cv7QIiznMxE7Iwpm37A5S7Go7841eyDx7cii1Uk";
// const SCOPE = "https://www.googleapis.com/auth/youtube.upload";

// // ------------------------------------------------
// // // YouTube API credentials
// // const CLIENT_ID =
// //   "896014529303-ac9dm0ino09r4rvqn2ba77aob3fel8ns.apps.googleusercontent.com";
// // const CLIENT_SECRET = "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";
// // // const REDIRECT_URI = "https://developers.google.com/oauthplayground";
// // const REDIRECT_URI = "https://localhost:3000/upload";

// // // Refresh token obtained after authorization
// // const REFRESH_TOKEN =
// //   "1//046jpYqem1NXvCgYIARAAGAQSNwF-L9IrdNzwqz_AEBe6MGK7nu4pPieO8pgpd5JlJcuUCxP4JK_VV0pouUEipKMPnowfnSKJ7QI";
// // const SCOPE = "https://www.googleapis.com/auth/youtube.upload";

// // Set up OAuth2 client with appropriate scope
// const oauth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );
// oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN, scope: SCOPE });

// // Upload video function
// // async function uploadVideo(videoPath) {
// //   const youtube = google.youtube({ version: "v3", auth: oauth2Client });

// //   const videoMetadata = {
// //     snippet: {
// //       title: "My Uploaded Video",
// //       description: "This is a video uploaded from the backend",
// //     },
// //     status: {
// //       privacyStatus: "private", // Set privacy status as needed
// //     },
// //   };

// //   const videoParams = {
// //     part: "snippet,status",
// //     requestBody: videoMetadata,
// //     media: {
// //       body: fs.createReadStream(videoPath),
// //     },
// //   };

// //   try {
// //     const response = await youtube.videos.insert(videoParams);
// //     const videoUrl = `https://www.youtube.com/watch?v=${response.data.id}`;

// //     console.log(response.data);
// //     console.log("Video ID:", response.data.id);
// //     console.log("Video URL:", videoUrl);
// //     console.log("Category ID:", videoMetadata.snippet.categoryId); // Log the categoryId

// //     console.log("Video uploaded successfully!");
// //     console.log("Video ID:", response.data.id);
// //   } catch (error) {
// //     console.error("Error uploading video:", error.message);
// //   }
// // }

// // // Route for uploading video
// // app.post("/upload", upload.single("video"), (req, res) => {
// //     uploadVideo(req.file.path)
// //       .then(() => res.sendStatus(200))
// //       .catch((error) => {
// //         console.error(error);
// //         res.sendStatus(500);
// //       });
// //   });

// // ---------------------------------upload video---------------------------------
// async function uploadVideo(videoPath) {
//   const youtube = google.youtube({ version: "v3", auth: oauth2Client });

//   try {
//     // Fetch the list of supported video categories
//     const categoryResponse = await youtube.videoCategories.list({
//       part: "snippet",
//       regionCode: "US", // Provide a region code to ensure correct localization
//     });

//     // Find the category ID based on the category title "Educational"
//     const educationalCategory = categoryResponse.data.items.find(
//       (item) => item.snippet.title === "Education"
//     );

//     if (!educationalCategory) {
//       console.error("Educational category not found.");
//       return;
//     }

//     // Use the found category ID
//     const categoryId = educationalCategory.id;

//     const videoMetadata = {
//       snippet: {
//         title: "My Uploaded Video",
//         description: "This is an educational video uploaded from the backend",
//         categoryId: categoryId,
//       },
//       status: {
//         privacyStatus: "private",
//       },
//     };

//     const videoParams = {
//       part: "snippet,status",
//       requestBody: videoMetadata,
//       media: {
//         body: fs.createReadStream(videoPath),
//       },
//     };

//     const response = await youtube.videos.insert(videoParams);
//     const videoUrl = `https://www.youtube.com/watch?v=${response.data.id}`;

//     console.log("Video uploaded successfully!");
//     console.log("Video ID:", response.data.id);
//     console.log("Video URL:", videoUrl);
//     console.log("Category ID:", categoryId); // Log the categoryId
//   } catch (error) {
//     console.error("Error uploading video:", error.message);
//   }
// }

// // Route for uploading video
// app.post("/upload", upload.single("video"), (req, res) => {
//   uploadVideo(req.file.path)
//     .then(() => res.sendStatus(200))
//     .catch((error) => {
//       console.error(error);
//       res.sendStatus(500);
//     });
// });
// // ----------------------delete--------------------

// // Function to delete a video
// async function deleteVideo(videoId) {
//   const youtube = google.youtube({
//     version: "v3",
//     auth: oauth2Client,
//   });
//   try {
//     await youtube.videos.delete({
//       id: videoId,
//     });
//     console.log(`Video with ID ${videoId} was deleted successfully.`);
//   } catch (error) {
//     console.error("Error deleting video:", error.message);
//   }
// }

// // Example usage of deleteVideo function
// // You need to replace 'VIDEO_ID' with the actual ID of the video you want to delete
// // deleteVideo("W_n6legKoQA");
// // Start server

// // ----------------------update the title and description--------------------
// async function updateVideo(videoId, newTitle, newDescription, categoryId) {
//   const youtube = google.youtube({ version: "v3", auth: oauth2Client });

//   try {
//     // Fetch the list of supported video categories
//     const categoryResponse = await youtube.videoCategories.list({
//       part: "snippet",
//       regionCode: "US", // Provide a region code to ensure correct localization
//     });

//     // Find the category ID based on the category name or other criteria
//     const categoryItem = categoryResponse.data.items.find(
//       (item) => item.snippet.title === categoryId
//     );

//     if (!categoryItem) {
//       console.error("Category not found.");
//       return;
//     }

//     // Use the found category ID
//     categoryId = categoryItem.id;

//     const videoMetadata = {
//       id: videoId, // Video ID to update
//       snippet: {
//         title: newTitle,
//         description: newDescription,
//         categoryId: categoryId, // Specify the category ID here
//       },
//       // Specify any additional fields you want to update
//     };

//     const response = await youtube.videos.update({
//       part: "snippet", // Parts you are updating, could also include 'status' etc.
//       requestBody: videoMetadata,
//     });

//     console.log("Video updated successfully");
//     console.log(response.data);
//     // You can save the updated information or further process it here
//   } catch (error) {
//     console.error("Error updating video:", error.message);
//   }
// }

// // Example usage
// // updateVideo(
// //   "C5z03Ov434g",
// //   "update title",
// //   " updated description.",
// //   "Education"
// // );

// app.listen(3000, () => console.log("Server started on port 3000"));
// // -------------------------------------------------------------------------------------//
// // -------------------------------------------------------------------------------------//
// // -------------------------------------------------------------------------------------//
// // -------------------------------------------------------------------------------------//
// // -----------------------------youtube upload using api----------------------------------------//
// // ----------------------------------admin controller------------------------------------------//
// // -------------------------------------------------------------------------------------//
// // -------------------------------------------------------------------------------------//
// // -------------------------------------------------------------------------------------//
// const express = require("express");
// const adminController = express();
// const User = require("../model/user");
// const cookieParser = require("cookie-parser");
// const Video = require("../model/video");
// const { google } = require("googleapis");
// const fs = require("fs");
// // const multer = require("multer");

// adminController.use(express.json());
// adminController.use(express.urlencoded({ extended: false }));
// adminController.use(cookieParser());
// // // pandeyrajeshraj21@gmail.com
// // const CLIENT_ID =
// //   "823512880578-e04u338ijsmoomvi166lvs7n3n7u69j9.apps.googleusercontent.com";
// // const CLIENT_SECRET = "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";
// // const REDIRECT_URI = "https://developers.google.com/oauthplayground";
// // const REFRESH_TOKEN =
// //   "1//04uGsh1gVb8jACgYIARAAGAQSNwF-L9IruoYtSbtZM3htUMrvRBJlJTN4x3K_Cv7QIiznMxE7Iwpm37A5S7Go7841eyDx7cii1Uk";
// // const SCOPE = "https://www.googleapis.com/auth/youtube.upload";

// // YouTube API credentials rajeshpandry24@gmail.com
// const CLIENT_ID =
//   "1069545703547-ti82ku91rfd8vj82j2fd1enbb8khjfuo.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";

// // Refresh token obtained after authorization
// // const REFRESH_TOKEN =
// //   "1//04YSmW8OqPPTECgYIARAAGAQSNwF-L9Iry5_7w_DmoUb5EFy6RqcLYFrYqhzbMt6RbX-fCHHf50ZobkjhV0pf0mzp-InLQMguQnE";
// const REFRESH_TOKEN =
//   "1//0f8gxIyzx0KsUCgYIARAAGA8SNwF-L9Ir3Xh8WK_ShGnkW3cRvPvzxZXtpmVAoy5oUMnupfYv3ZtwttaUxfh1JuklW8s9XTwGeEs";
// const SCOPE = "https://www.googleapis.com/auth/youtube.upload";

// const oauth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );
// oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN, scope: SCOPE });

// ////////----------------User work----------------////////
// ////------------------------get dashboard------------------------////
// // exports.dashboard = async (req, res) => {
// //   try {
// //     res.status(200).json({
// //       status: "ok",
// //       message: "dashboard",
// //     });
// //   } catch (err) {
// //     console.log(err);
// //   }
// // };

// //////////////////////////////////////////////////////////////////////////////////////
// // crud operation for videos in admin panel-----------------------
// //////////////////////////////////////////////////////////////////////////////////////

// ////------------------------ delete user ------------------------////
// // exports.deleteUser = async (req, res) => {
// //   try {
// //     const data = await User.findByIdAndDelete(req.params.userId);
// //     res.status(200).json({
// //       status: "ok",
// //       data: data,
// //     });
// //   } catch (err) {
// //     console.log(err);
// //   }
// // };

// // ////------------------------ get all user ------------------------////
// // exports.allUser = async (req, res) => {
// //   try {
// //     const data = await User.find();
// //     res.status(200).json({
// //       status: "ok",
// //       data: data,
// //     });
// //   } catch (err) {
// //     console.log(err);
// //   }
// // };

// //////////////////////////////////////////////////////////////////////////////////////
// // --------------------crud operation for videos in admin panel-----------------------
// //////////////////////////////////////////////////////////////////////////////////////
// ///////-----------------!!!!!!!!!!!!!!!-----------------/////

// ////------------------------ upload video to google drive ------------------------////
// exports.uploadCourse = async (req, res) => {
//   const youtube = google.youtube({ version: "v3", auth: oauth2Client });
//   const { title, description } = req.body;
//   const videoPath = req.file.path;

//   try {
//     // Fetch the list of supported video categories
//     const categoryResponse = await youtube.videoCategories.list({
//       part: "snippet",
//       regionCode: "US", // Provide a region code to ensure correct localization
//     });

//     // Find the category ID based on the category title "Educational"
//     const educationalCategory = categoryResponse.data.items.find(
//       (item) => item.snippet.title === "Education"
//     );

//     if (!educationalCategory) {
//       console.error("Educational category not found.");
//       return;
//     }

//     // Use the found category ID
//     const categoryId = educationalCategory.id;

//     const videoMetadata = {
//       snippet: {
//         title: title,
//         description: description,
//         categoryId: categoryId,
//       },
//       status: {
//         privacyStatus: "unlisted",
//       },
//     };

//     const videoParams = {
//       part: "snippet,status",
//       requestBody: videoMetadata,
//       media: {
//         body: fs.createReadStream(videoPath),
//       },
//     };

//     const response = await youtube.videos.insert(videoParams);
//     const videoUrl = `https://www.youtube.com/watch?v=${response.data.id}`;

//     console.log("Video uploaded successfully!");
//     console.log("Video ID:", response.data.id);
//     console.log("Video URL:", videoUrl);
//     console.log("Category ID:", categoryId); // Log the categoryId
//     const video = new Video({
//       title,
//       description,
//       videoId: response.data.id,
//       videoLink: videoUrl,
//     });

//     await video.save();
//     console.log("Video saved to database!");
//     console.log(video);
//     res.sendStatus(200);
//   } catch (error) {
//     console.error("Error uploading video:", error.message);
//     res.sendStatus(500);
//   }
// };

// // ////------------------------ get all courses courses------------------------////
// // exports.courses = async (req, res) => {
// //   const courses = await Video.find();
// //  try {
// //   res.status(200).json({
// //     status: "ok",
// //     message: courses,
// //   });
// // } catch (err) {
// //   console.log(err);
// // }
// // };

// // // ////------------------------ edit video content------------------------////

// // // ////------------------------ Admin Router ------------------------////
// // // ////------------------------ Admin Router ------------------------////
// // // ////------------------------ Admin Router ------------------------////
// // // ////------------------------ Admin Router ------------------------////
// // // ////------------------------ Admin Router ------------------------////
// // // ////------------------------ Admin Router ------------------------////
// // const express = require("express");
// // const adminRouter = express.Router();
// // const adminController = require("../controller/adminController");
// // const multer = require("multer");
// // const uploadCourse = multer({ dest: "uploads/" });

// // // const auth = require("../auth/userAuth");

// // // adminRouter.route("/").get(adminController.dashboard);
// // // adminRouter.route("/allUser").get(adminController.allUser);
// // // adminRouter.route("/course").get(adminController.courses);

// // ////------------------------post operations------------------------////
// // // adminRouter.route("/uploadCourse").post(auth, adminController.uploadCourse);
// // adminRouter
// //   .route("/uploadCourse")
// //   .post(uploadCourse.single("file"), adminController.uploadCourse);

// // // update the courses
// // // adminRouter.route("/updateCourse/:videoId").put(adminController.updateCourse);

// // // ////------------------------delete operations------------------------////
// // // //--!!!!delete video--!!!!
// // // adminRouter
// // //   .route("/deleteCourse/:videoId")
// // //   .delete(adminController.deleteCourse);

// // // //--!!!!delete video--!!!!
// // // adminRouter.route("/deleteUser/:userId").delete(adminController.deleteUser);

// // module.exports = adminRouter;
