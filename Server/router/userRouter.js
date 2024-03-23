const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");
const auth = require("../auth/userAuth");

router.route("/home").get(controller.home);
router.route("/signup").post(controller.signup);
router.route("/login").post(controller.login);
router.route("/secure").get(controller.secure);
// router.route("/secure").get(auth, controller.secure);
router.route("/getVideo/:videoId").get(controller.getVideo);
router
  .route("/getUserSubscriptions")
  .get(auth, controller.getUserSubscriptions);
router.route("/allVideos").get(controller.allVideos);
router.route("/subscribe/:videoId").post(auth, controller.subscribe);
router.route("/unsubscribe/:videoId").post(auth, controller.unsubscribe);
router
  .route("/checksubscribe/:videoId")
  .get(auth, controller.checkSubscription);

// router.route("/fuzzySearch").get(controller.fuzzySearch);

////contact us
router.route("/contact").post(controller.contact);

// fuzzy search
router.route("/fuzzySearch").get(controller.fuzzySearch);
router.route("/getTopSubscribedVideos").get(controller.getTopSubscribedVideos);
router
  .route("/videosWithSimilarCategory/:category")
  .get(controller.videosWithSimilarCategory);

// router.route("/recommendations/:videoId").get(controller.recommendationsController);
router.route("/recommendations_data/:id").get(controller.getRecommendations);

module.exports = router;
