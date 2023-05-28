const express = require("express");
const { registerUser,authuser ,allUsers} = require("../controllers/userController");
const {protect} = require('../middleware/authMiddleware')
const router = express.Router();

router.route("/").post(registerUser).get(protect,allUsers);
router.route("/login").post(authuser)
module.exports = router;
