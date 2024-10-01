const Product = require('../models/Product');
const path = require('path');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

const uploadProductImage = async ( req , res ) => {
    // To access the image use req.files.(name)
    // console.log(productImage);

    // Check if file exist
    if(!req.files){
        throw new CustomError.BadRequestError('No File Uploaded');
    }

    let productImage = req.files.image;

    // Check Format
    if(!productImage.mimetype.startsWith('image')){
        throw new CustomError.BadRequestError('Please upload Image');
    }

    // Check Size
    const maxSize = 1024 * 1024;
    if(productImage.size > maxSize){
        throw new CustomError.BadRequestError('Please upload image smaller than 1MB')
    }

    const imagePath = path.join(__dirname,'../public/uploads/' + `${productImage.name}`);
    await productImage.mv(imagePath);
    res.status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}`} });
}

module.exports = {
    uploadProductImage
}