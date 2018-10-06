const router = require("express").Router();

const UserRoutes 	= require("./user");
const AccountRoutes = require("./account");
const NewsRoutes = require("./news");


router.use("/user", UserRoutes);

router.use("/account", AccountRoutes);

router.use("/news", NewsRoutes);



module.exports = router;
