// const newAuthor = require("../models/newAuthor")
// // const newBook = require("../models/newBook")
// const bookModel = require("../models/newBook")
// const newPublisher = require("../models/newPublisher")

// // create new book on the database
// let newCreateBook = async function (req, res) {
//     let book = req.body
//     let authorId = book.author_id
//     let publisherId = book.publisher
//     const arrId = await newAuthor.find().select({ _id: 1 })
//     const arrPublisher = await newPublisher.find().select({ _id: 1 })
//     // a check the author id and b check the publisher id
//     let a = false
//     let b = false
// // check the condition if it is valid Id or not
//     arrId.forEach(element => {
//         let authorID2 = element._id
//         if (authorID2 == authorId) {
//             a = true
//             arrPublisher.forEach(element2 => {
//                 let publisherId2 = element2._id
//                 if (publisherId == publisherId2) {
//                     b = true

//                 }
//             });

//         }
//     });
//     // when wrong id got send message accordingly
//     if (!a) {
//         res.send("author id is not valid")
//     }
//     if (!b) res.send("publisher id is not valid")
//     let bookCreated = await bookModel.create(book)
//     res.send(bookCreated)
// }
// // get all the book from the database with publisher info and author
// const getAllBook = async function (req, res) {
//     const allBook = await bookModel.find().populate(['author_id', 'publisher'])
//     res.send(allBook)
// }
// // update the value true of isHardCover 
// const updateValue = async function (req, res) {
//     // getting id from newPublisher database 
//     const data = await newPublisher.find({"name":["Penguin","HarperCollins"]}).select({_id:1})
//     const update=await bookModel.updateMany({publisher:data},{isHardCover:true},{new:true})
//     res.send(update);
// }
// // increase the price of book by 10 in range of condition
// const updatePrice = async function (req, res) {
//     const data = await newAuthor.find({rating:{$gt:3.5}}).select({_id:1})
//     const update=await bookModel.updateMany({author_id:data},{$inc:{price:+10}},{new:true})

//     res.send(update);
// }


// module.exports.newCreateBook = newCreateBook
// module.exports.getAllBook = getAllBook
// module.exports.updateValue = updateValue
// module.exports.updatePrice = updatePrice

const authorModel = require("../models/newAuthor")
const bookModel = require("../models/newBook")
const publisherModel = require("../models/newPublisher")

const createBook = async function (req, res) {
    let book = req.body
    let author = book.author
    let publisher = book.publisher

    let authorid = await authorModel.find().select({ _id: 1 })
    let autID = authorid.map(x => x._id.toString())

    let publisherid = await publisherModel.find().select({ _id: 1 })
    let pubId = publisherid.map(x => x._id.toString())

    if (!(author && publisher)) {
        res.send({ data: "please enter author and publisher" })
    }
    else if (!(autID.includes(author) && pubId.includes(publisher))) {
        res.send({ data: "please enter valid authorid or publisherid" })
    }
    else {
        let bookCreated = await bookModel.create(book)
        res.send({ data: bookCreated })
    }
}



const getBooksData = async function (req, res) {
    let books = await bookModel.find()
    res.send({ data: books })
}


const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author publisher') //mutiple key references
    res.send({ data: specificBook })
}


const updateBooks = async function (req, res) {
    let publish = await publisherModel.find({ name: { $in: ["Penguin Random House", "HarperCollins"] } }).select({ _id: 1 })
    let p2 = publish.map(x => x._id)
    let updatecover = await bookModel.updateMany({ publisher: p2 }, { isHardCover: true }, { new: true })

    let rating = await authorModel.find({ rating: { $gt: 3.5 } }).select({ _id: 1 })
    let r2 = rating.map(x => x._id)
    let updateRating = await bookModel.updateMany({ author: r2 }, { $inc: { price: 10 } }, { new: true })

    res.send({ data: updateRating, updatecover })
}



const getSumOfPrices = async function(req,res){
    let sum = await bookModel.aggregate([
        { $group: { _id:'$name', sumOfPrices:{$sum:"$price"}}},
        {$sort:{sumOfPrices:-1} }
    ])
    res.send({msg:sum})
}


module.exports.createBook = createBook
module.exports.getBooksData = getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
module.exports.updateBooks = updateBooks
module.exports.getSumOfPrices = getSumOfPrices
