const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controller/adminController");
const multer = require("multer");
const uploadCourse = multer({ dest: "uploads/" });
const auth = require("../auth/adminAuth");

// ////------------------------get operations for user------------------------////
adminRouter.route("/").get(adminController.dashboard);
adminRouter.route("/allUser").get(adminController.allUser);
adminRouter.route("/user/:userId").get(adminController.getUser);
adminRouter.route("/course").get(adminController.courses);

// ////------------------------Delete operations for user------------------------////
adminRouter
  .route("/deleteUser/:userId")
  .delete(auth, adminController.deleteUser);

////------------------------!!!!!!!!!!!!!!!!------------------------////
////------------------------router fro video------------------------////
////------------------------!!!!!!!!!!!!!!!!------------------------////
// adminRouter.route("/uploadCourse").post(auth, adminController.uploadCourse);
adminRouter.route("/uploadCourse").post(
  uploadCourse.fields([
    { name: "videoPath", maxCount: 1 },
    { name: "thumbnailPath", maxCount: 1 },
  ]),
  adminController.uploadCourse
);

// adminRouter
//   .route("/uploadCourse")
//   .post(uploadCourse.single("file"), adminController.uploadCourse);

////------------------------update operations------------------------////
adminRouter.route("/updateCourse/:videoId").put(adminController.updateCourse);
////------------------------delete operations------------------------////
adminRouter
  .route("/deleteCourse/:videoId")
  .delete(adminController.deleteCourse);

////------------------------get operations for contact------------------------////
adminRouter.route("/contact").get(adminController.contact);
////------------------------get operations for Fuzzy------------------------////
adminRouter.route("/search").get(adminController.fuzzySearch);

////------------------------admin login------------------------////
adminRouter.route("/signup").post(adminController.signup);
adminRouter.route("/login").post(adminController.login);

module.exports = adminRouter;
