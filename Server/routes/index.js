const path   = require("path");
const router = require("express").Router();

const apiRoutes 	 = require("./api");
const passportRoutes = require("./passport/passport.js");

// API Routes
router.use("/api", apiRoutes);

// PSSPORT Routes
router.use("/auth", passportRoutes);

// If no API routes are hit, send the React app
// router.use((req, res) => {
// const index = path.join(__dirname, '../../client/build', 'index.html');
//   res.sendFile(index);  
// });

module.exports = router;
