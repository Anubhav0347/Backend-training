const mongoose=require('mongoose');
const bookModel=new mongoose.Schema({

    bookName:{
        type:String,
        required:true
    },
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    year:{
        type:Number,
        default:2021
    },
    tags:[String],
    authorName:String,
    totalPages:Number,
    isStockAvailable:Boolean
})




module.exports = mongoose.model('newBook434', bookModel) 