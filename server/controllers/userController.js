import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import catchError from "../utils/catchError.js";
import bcrypt from 'bcryptjs';


export const register = catchError(async (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        throw new AppError(400, 'Please provide name, email and password')
    }

    // check if user already exists
    const foundUser = await User.findOne({ email });
    if(foundUser) {
        throw new AppError(400, 'This Email already registered')
    }

    // create new user
    const user = await User.create({
        name,
        email,
        password
    })
    // generate jwt token
    const token = user.getToken();

    res.status(201).json({
        success: true,
        data : user,
        token
    })
});



export const login = catchError(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        throw new AppError(400, 'Please provide email and password')
    }

    // check if user exists with provided email
    const foundUser = await User.findOne({ email });
    if(!foundUser) {
        throw new AppError(400, 'Invalid Credentials')
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if(!isMatch) {
        throw new AppError(400, 'Invalid Credentials')
    }

    // everything is ok, generate new jwt token
    const token = foundUser.getToken();
    res.status(200).json({
        success: true,
        data : foundUser,
        token
    })
})