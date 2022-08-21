const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel.js");
const userController = require("../controllers/userCotroller.js")

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

router.post("/createUser", userController.createUser)

router.get("/getUser", userController.getUserData)

module.exports = router;
// adding this comment for no reason
