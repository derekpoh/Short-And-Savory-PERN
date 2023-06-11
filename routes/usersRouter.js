const userController = require("../controllers/usersController");
const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn")

router.post("/register", userController.create);
router.post("/login", userController.login);
router.get("/:id/bookmarks", ensureLoggedIn,  userController.checkBookmark)

module.exports = router;