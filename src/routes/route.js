const express = require('express');
const router = express.Router();
// const userController= require("../controllers/userController")
// const tokenMid= require("../middlewares/auth")
const CowinController= require("../controllers/cowinController")

// router.post("/users", userController.createUser  )
// router.post("/login", userController.loginUser)

// //The userId is sent by front end
// router.get("/users/:userId", tokenMid.checkToken, userController.getUserData)
// router.put("/users/:userId", tokenMid.checkToken, userController.updateUser)
// router.delete("/users/:userId", tokenMid.checkToken, userController.deleteUser)




router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date

router.get("/vacSession", CowinController.vacSession)
router.post("/getMemes", CowinController.getMemes)
router.post("/getWeather", CowinController.getWeather)
router.get("/sortCityByTemp", CowinController.sortCityByTemp)


module.exports = router;