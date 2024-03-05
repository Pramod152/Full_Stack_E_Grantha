const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");
const auth = require("../auth/userAuth");

router.route("/home").get(controller.home);
router.route("/sinup").post(controller.sinup);
router.route("/login").post(controller.login);
router.route("/secure").get(controller.secure);
// router.route("/secure").get(auth, controller.secure);
// router.route("/getVideo/:videoId").get(auth, controller.getVideo);
router.route("/getUserSubscriptions").get(auth, controller.getUserSubscriptions);
router.route("/allVideos").get(controller.allVideos);
// router.route("/allVideos").get(auth, controller.allVideos);
router.route("/subscribe/:videoId").post(auth, controller.subscribe);
router.route("/unsubscribe/:videoId").post(auth, controller.unsubscribe);
router.route("/unsubscribe/:videoId").delete(auth, controller.unsubscribe);

module.exports = router;
