const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controller/adminController");
const multer = require("multer");
const uploadCourse = multer({ dest: "uploads/" });
const auth = require("../auth/adminAuth");

// ////------------------------get operations for user------------------------////
adminRouter.route("/").get(auth, adminController.dashboard);
adminRouter.route("/allUser").get(auth, adminController.allUser);
adminRouter.route("/user/:userId").get(auth, adminController.getUser);
adminRouter.route("/course").get(auth, adminController.courses);

// ////------------------------Delete operations for user------------------------////
adminRouter.route("/deleteUser/:userId").delete(auth, adminController.deleteUser);

////------------------------!!!!!!!!!!!!!!!!------------------------////
////------------------------router fro video------------------------////
////------------------------!!!!!!!!!!!!!!!!------------------------////
// adminRouter.route("/uploadCourse").post(auth, adminController.uploadCourse);
adminRouter
  .route("/uploadCourse")
  .post(auth, uploadCourse.single("file"), adminController.uploadCourse);
////------------------------update operations------------------------////
adminRouter.route("/updateCourse/:videoId").put(auth,adminController.updateCourse);
////------------------------delete operations------------------------////
adminRouter
  .route("/deleteCourse/:videoId")
  .delete(auth, adminController.deleteCourse);

////------------------------get operations for contact------------------------////
adminRouter.route("/contact").get(auth, adminController.contact);
////------------------------get operations for Fuzzy------------------------////
adminRouter.route("/search").get(auth, adminController.fuzzySearch);

////------------------------admin login------------------------////
adminRouter.route("/signup").post(adminController.signup);
adminRouter.route("/login").post(adminController.login);

module.exports = adminRouter;
