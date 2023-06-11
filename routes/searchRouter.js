const searchController = require("../controllers/searchController");
const express = require("express");
const router = express.Router();

router.get("/", searchController.search)

module.exports = router;