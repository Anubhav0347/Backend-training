const newAuthor = require("../models/newAuthor")
const newBook = require("../models/newBook")
const bookModel = require("../models/newBook")
const newPublisher = require("../models/newPublisher")

// create new book on the database
let newCreateBook = async function (req, res) {
    let book = req.body
    let authorId = book.author_id
    let publisherId = book.publisher
    const arrId = await newAuthor.find().select({ _id: 1 })
    const arrPublisher = await newPublisher.find().select({ _id: 1 })
    // a check the author id and b check the publisher id
    let a = false
    let b = false
// check the condition if it is valid Id or not
    arrId.forEach(element => {
        let authorID2 = element._id
        if (authorID2 == authorId) {
            a = true
            arrPublisher.forEach(element2 => {
                let publisherId2 = element2._id
                if (publisherId == publisherId2) {
                    b = true

                }
            });

        }
    });
    // when wrong id got send message accordingly
    if (!a) {
        res.send("author id is not valid")
    }
    if (!b) res.send("publisher id is not valid")
    let bookCreated = await bookModel.create(book)
    res.send(bookCreated)
}
// get all the book from the database with publisher info and author
const getAllBook = async function (req, res) {
    const allBook = await bookModel.find().populate(['author_id', 'publisher'])
    res.send(allBook)
}
// update the value true of isHardCover 
const updateValue = async function (req, res) {
    // getting id from newPublisher database 
    const data = await newPublisher.find({"name":["Penguin","HarperCollins"]}).select({_id:1})
    const update=await bookModel.updateMany({publisher:data},{isHardCover:true},{new:true})
    res.send(update);
}
// increase the price of book by 10 in range of condition
const updatePrice = async function (req, res) {
    const data = await newAuthor.find({rating:{$gt:3.5}}).select({_id:1})
    const update=await bookModel.updateMany({author_id:data},{$inc:{price:+10}},{new:true})

    res.send(update);
}


module.exports.newCreateBook = newCreateBook
module.exports.getAllBook = getAllBook
module.exports.updateValue = updateValue
module.exports.updatePrice = updatePrice
