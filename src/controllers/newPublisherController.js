const publisherModel= require("../models/newPublisher")

const createPublisher= async function (req, res) {
    let publisherInfo = req.body
    let publisherCreated = await publisherModel.create(publisherInfo)
    res.send({data: publisherCreated})
}

module.exports.createPublisher= createPublisher