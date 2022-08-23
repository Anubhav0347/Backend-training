const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const bookSchema = new mongoose.Schema( {
    name: String,
    author_id: {
        type: ObjectId,
        required:true,
        ref: "newAuthor"
    }, 
    price: Number,
    ratings: Number,
    publisher: {
        type: ObjectId,
        required:true,
        ref: "newPublisher"
    },
    isHardCover:{
        type:Boolean,
        default:false
    }


}, { timestamps: true });


module.exports = mongoose.model('newBook', bookSchema)