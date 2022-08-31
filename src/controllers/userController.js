const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  try {
    let data = req.body;

    if(Object.keys(data).length != 0){
      let savedData = await userModel.create(data);
      res.status(201).send({ msg: savedData });
    }else   res.status(400).send({status : false, msg : "Bad Request"})

  } catch (error) {
    res.status(500).send({status : false, msg : error.message})
  }
};

const loginUser = async function (req, res) {
  try {
    let userName = req.body.emailId;
    let password = req.body.password;

    let user = await userModel.findOne({ emailId: userName, password: password });
    if (!user)    return res.status(404).send({status: false, msg: "User not found",});

    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "plutonium",
        organisation: "FunctionUp",
      },
      "functionup-plutonium"
    );
    res.status(200).send({ status: true, token: token });

  } catch (error) {
    res.status(500).send({status : false, msg : error.message})
  }
  
};

const getUserData = async function (req, res) {
  try {
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);

    if (!userDetails)   return res.status(404).send({ status: false, msg: "No such user exists" });
    res.status(200).send({ status: true, data: userDetails });
  } catch (error) {
    res.status(500).send({status : false, msg : error.message})
  }
  
};

const updateUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    let user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send("No such user exists");
    }

    let userData = req.body;

    if(Object.keys(userData).length != 0){
      let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData, {new : true});
      res.status(200).send({ status: true, data: updatedUser });
    }else   res.status(400).send({status : false, msg : "Bad Request"})

  } catch (error) {
    res.status(500).send({status : false, msg : error.message})
  }
  
};

const deleteUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    let updatedUser = await userModel.findOneAndUpdate({_id : userId}, {"isDeleted" : true}, {new : true});

    if(!updatedUser) return res.status(400).send("No user found")
    res.status(200).send({ status: true, data: updatedUser })
  } catch (error) {
    res.status(500).send({status : false, msg : error.message})
  }
  
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
