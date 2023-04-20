import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import catchError from "../utils/catchError.js";
import jwt from 'jsonwebtoken';


const isAuthenticated = catchError(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return next(new AppError(401, 'Not authorized to access this route'))
    }


    let decodedData;
    // verify the token and get decoded data
    try {
        decodedData = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return next(new AppError(400, error.message))
    }

    const user = await User.findById(decodedData._id)
    
    if (!user) {
        return next(new AppError(401, 'Not authorized to access this route'))
    }
    // append the user to the request object for further use
    req.user = user;

    next();
});

export default isAuthenticated;