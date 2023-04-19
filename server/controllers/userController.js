import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import catchError from "../utils/catchError.js";


export const register = catchError(async (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        throw new AppError(400, 'Please provide name, email and password')
    }

    const user = await User.findOne({ email });
    console.log({user});
    if(user) {
        throw new AppError(400, 'This Email already registered')
    }

    const data = await User.create({
        name,
        email,
        password
    })
    console.log({data});
    res.status(201).json({
        success: true,
        data
    })
});