const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  firstName: String, // String is shorthand for {type: String}
  lastName: String,
  mobile: { String, unique: true, required: true },
  email: String,
  gender: { type: String, enum: ["male", "female", "LGBTQ"] },
  age: Number,
  isIndian: Boolean,   //these datas are added later but this is the power of No SQL that later added data can coexist.
  parentsInfo:{
    motherName:String,
    fatherName: String,
    siblingName:String
  },
  cars:[ String]
  //   comments: [{ body: String, date: Date }],
  //   date: { type: Date, default: Date.now },
  //   hidden: Boolean,
  //   meta: {
  //     votes: Number,
  //     favs:  Number
  //   }
});

module.exports= mongoose.model("User",userSchema) //users
