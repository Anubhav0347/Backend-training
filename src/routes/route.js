const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
const Book1Controller=require("../controllers/book1Controller")

router.get("/test-me", function (_req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser  )

router.get("/getUsersData", UserController.getUsersData)

router.post("/createBook", BookController.createBook  )

router.get("/getBooksData", BookController.getBooksData)

router.post("/newCreateBook", Book1Controller.newCreateBook  )

router.get("/newGetBooksData", Book1Controller.newGetBooksData)
router.get("/newbookList", Book1Controller.newbookList)
router.post("/newGetBooksInYear", Book1Controller.newGetBooksInYear)
router.post("/newgetParticularBooks", Book1Controller.newgetParticularBooks)
router.get("/newgetXINRBooks",  Book1Controller.newgetXINRBooks)
router.get("/newgetRandomBooks",  Book1Controller.newgetRandomBooks)



module.exports = router;