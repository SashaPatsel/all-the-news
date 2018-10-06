const router = require("express").Router();
const newsController = require("../../controllers/news-controller");

router.route("/").get(newsController.getStories)

module.exports = router;