const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
// this is just for check aysnc function to stop and show error if requst is not stop
const catchAsyncErrors = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures')

//create new product => /api/v1/product/new
exports.newProduct = catchAsyncErrors( async (req,res,next) =>{
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})
//get all products => /api/v1/products
//http://localhost:6000/api/v1/products?keyword=SanDisk
exports.getProducts =catchAsyncErrors( async (req,res,next) =>{
    const resPerPage = 4;
    const productCount = await Product.countDocuments();
    const apiFeatures = new APIFeatures(Product.find(),req.query)
                                        .search()
                                        .filter()
                                        .pagination(resPerPage)
    const products = await apiFeatures.query;
    // const products = await Product.find();
    res.status(200).json({
        success:true,
        count: products.length,
        productCount,
        products
    })
})

//get single product details
exports.getSingleProduct = catchAsyncErrors(  async(req,res,next)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        // return res.status(404).json({
        //     success:false,
        //     message:'product not found'
        // })
        return next(new ErrorHandler('Product not Found',404))
    }
    res.status(200).json({
        success:true,
        product
    })
})

//update Product => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(  async (req,res,next) =>{
    let product = await Product.findById(req.params.id)
    if(!product){
        return res.status(404).json({
            success:false,
            message:'product not found'
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        success:true,
        product
    })

})
//delete Product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors( async (req,res,next) =>{
    let product = await Product.findById(req.params.id)
    if(!product){
        return res.status(404).json({
            success:false,
            message:'product not found'
        })
    }
    await product.deleteOne();
    res.status(200).json({
        success:true,
        message:'Product is deleted'
    })

})