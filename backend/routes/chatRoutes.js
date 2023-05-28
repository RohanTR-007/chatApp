const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()
const {acessChat, fetchChats , createGroup, renameGroup, addTogroup, removefromGroup} = require('../controllers/chatController')


router.route("/").post(protect,acessChat)
router.route("/").get(protect,fetchChats)
router.route("/group").post(protect,createGroup)
router.route("/rename").put(protect,renameGroup)
router.route("/removeuser").put(protect,removefromGroup)
router.route("/addgroup").put(protect,addTogroup);

module.exports = router;