const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const publisherSchema = new mongoose.Schema({
    
    name: {
    type:String,
    required:true,
    unique:true
},
headQuarter: String,
}
, { timestamps: true });


module.exports = mongoose.model('newPublisher', publisherSchema)