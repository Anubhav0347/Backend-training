const userModel = require("../models/userModel.js");
const createUser=async function (req, res) {
    let data = req.body;
    let savedData = await userModel.create(data);
    res.send({ msg: data });
}
const getUserData=async function (req, res) {
    let allUsers = await userModel.find();
    res.send({ msg: allUsers });
  };

module.export.createUser= createUser;
module.export.getUserData= getUserData;