const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controller/adminController");
const multer = require("multer");
const uploadCourse = multer({ dest: "uploads/" });

// ////------------------------get operations for user------------------------////
adminRouter.route("/").get(adminController.dashboard);
adminRouter.route("/allUser").get(adminController.allUser);
adminRouter.route("/course").get(adminController.courses);

// ////------------------------Delete operations for user------------------------////
adminRouter.route("/deleteUser/:userId").delete(adminController.deleteUser);

////------------------------!!!!!!!!!!!!!!!!------------------------////
////------------------------router fro video------------------------////
////------------------------!!!!!!!!!!!!!!!!------------------------////
// adminRouter.route("/uploadCourse").post(auth, adminController.uploadCourse);
adminRouter
  .route("/uploadCourse")
  .post(uploadCourse.single("file"), adminController.uploadCourse);
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

module.exports = adminRouter;
