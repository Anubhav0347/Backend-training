const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const newAuthorController= require("../controllers/newAuthorController")
const newPublisherController= require("../controllers/newPublisherController")
const newBookController= require("../controllers/newBookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )

router.get("/getAuthorsData", authorController.getAuthorsData)

router.post("/createBook", bookController.createBook  )

router.get("/getBooksData", bookController.getBooksData)

router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

router.post("/newcreateAuthor", newAuthorController.createAuthor)
router.post("/newPublisherController", newPublisherController.createPublisher)
router.post("/newBookController", newBookController.newCreateBook)
router.get("/getAllBook", newBookController.getAllBook)
router.get("/updateValue", newBookController.updateValue)
router.get("/updatePrice", newBookController.updatePrice)

module.exports = router;