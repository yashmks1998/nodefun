const asyncHandler = require("../middleware/async");
const User = require('../models/user');
const ErrorResponse = require("../middleware/ErrorResponse");
// @desc Register A User
// @route POST /api/v1/auth/register
// @access public
exports.register = asyncHandler(async (req, res, next) => {

    const {name, email, password, role} = req.body;

    const user = await User.create({name, email, password, role})
    
    const token = user.getSignedJwtToken();

    res.status(201).json({
            success: true,
            token
        });    
})


// @desc Register A User
// @route POST /api/v1/auth/login
// @access public
exports.login = asyncHandler(async (req, res, next) => {

    const { email, password} = req.body;

    if(!email || !password){
        throw new ErrorResponse('Please provide an email and password', 400)
    }
    const user = await User.findOne({email}).select('+password');
    if(!user){
        throw new ErrorResponse('Invalid credentials', 401)
    }
    // check password match
    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        throw new ErrorResponse('Invalid credentials', 401)
    }

    const token = user.getSignedJwtToken();

    res.status(201).json({
            success: true,
            token
        });    
})

// @desc Get current logged in user
// @route POST /api/v1/auth/profile
// @access private

exports.profile = asyncHandler(async (req, res, next) => {
    console.log(req.user.id)
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        data: user
    });

})