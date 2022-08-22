const { count } = require("console")
const newBookModel= require("../models/newBookModel")


// create book
const createBook=async function(req,res){
const data=req.body
const savedData=await newBookModel.create(data);
res.send(savedData)

}

module.exports.createBook= createBook