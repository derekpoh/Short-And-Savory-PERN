const recipesController = require("../controllers/recipesController");
const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn")


router.get("/mostviews", recipesController.mostViews)
router.get("/bestratings", recipesController.bestRatings)
router.get("/latestrecipes", recipesController.newestRecipes)
router.post("/create", ensureLoggedIn, recipesController.create)
router.get("/cuisines/:cuisine", recipesController.cuisine)
router.get("/:id", recipesController.show)
router.put("/:id", ensureLoggedIn, recipesController.update)
router.delete("/:id", ensureLoggedIn, recipesController.delete)
router.get("/:id/myrecipes", ensureLoggedIn, recipesController.myRecipes)
router.post("/:id/rating", ensureLoggedIn, recipesController.setRating)
router.post("/:id/comment", ensureLoggedIn, recipesController.setComment)
router.get("/:id/edit", ensureLoggedIn, recipesController.edit)
router.post("/:id/bookmark", ensureLoggedIn, recipesController.addBookmark)
router.delete("/:id/bookmark", ensureLoggedIn, recipesController.deleteBookmark)

module.exports = router;