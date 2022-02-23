//before saving password in database first encrypt it
const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncError');
const sendToken = require('../utils/jwtTokens');

// Register a user   => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    // const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: 'avatars',
    //     width: 150,
    //     crop: "scale"
    // })

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            // public_id: result.public_id,
            // url: result.secure_url
            public_id:'avatars/kccvibpsuiusmwfepb3m',
            url:'https://res.cloudinart.com/shoptit/image/upload/v1606305757/avatars/kccvibpsuiusmwfepb3m.png'
        }
    })
    // const token = user.getJwtToken();
    // res.status(201).json({
    //     success:true,
    //     // user,
    //     token
    // })

    sendToken(user, 200, res)

})
console.log('(new flag) line number 42 authcontoller ')
// Login User  =>  /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    console.log('(1) line number 42 authcontoller ')
    const { email, password } = req.body;

    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
    // const token = user.getJwtToken();
    // res.status(200).json({
    //     success:true,
    //     token
    // })
    sendToken(user, 200, res)
})
// Logout user   =>   /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})