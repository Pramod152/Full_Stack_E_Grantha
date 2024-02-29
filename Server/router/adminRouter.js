const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controller/adminController");
const multer = require("multer");
const uploadCourse = multer();
// const auth = require("../auth/userAuth");

// adminRouter.route("/").get(adminController.dashboard);
// adminRouter.route("/allUser").get(adminController.allUser);
adminRouter.route("/course").get(adminController.courses);

////------------------------post operations------------------------////
// adminRouter.route("/uploadCourse").post(auth, adminController.uploadCourse);
adminRouter
  .route("/uploadCourse")
  .post(uploadCourse.single("file"), adminController.uploadCourse);

// // update the courses
// adminRouter.route("/updateCourse/:videoId").put(adminController.updateCourse);

// ////------------------------delete operations------------------------////
// //--!!!!delete video--!!!!
// adminRouter
//   .route("/deleteCourse/:videoId")
//   .delete(adminController.deleteCourse);

// //--!!!!delete video--!!!!
// adminRouter.route("/deleteUser/:userId").delete(adminController.deleteUser);

module.exports = adminRouter;
