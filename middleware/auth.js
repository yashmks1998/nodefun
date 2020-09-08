const ErrorResponse = require("./ErrorResponse");
const asyncHandler = require("./async");
const User = require('../models/user')
const jwt = require('jsonwebtoken');


exports.protect = asyncHandler( async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
        throw new ErrorResponse('Not authorized to access this route', 401);
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded)
        req.user = await User.findById(decoded.id);
        next();
    }
    catch(err){
        console.log(err.message.red)
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
    
});

exports.authorize = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403))
        }
        else{
            req.otherRolesFlag = true;
        }
        next();
    }
}

