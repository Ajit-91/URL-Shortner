import mongoose, { Schema } from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    urls: [{
        type: Schema.Types.ObjectId,
        ref: 'ShortUrl'
    }]

}, { timestamps: true });

 // --------Fields Validation------------------------

userSchema.path('name').validate((value) => {
    if (value.length < 3) {
        throw new Error('Name must be at least 3 characters long')
    }
})

userSchema.path('email').validate((value) => {
    if (!validator.isEmail(value)) {
        throw new Error('Email is not valid')
    }
})

userSchema.path('password').validate((value) => {
    const isValid = validator.isStrongPassword(value, {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 0, 
        minSymbols: 1
    })

    if (!isValid) {
        throw new Error('Password must be at least 6 characters long and must contain at least one lowercase letter, one uppercase letter and one special character')
    }
})



// --------Hashing password (While Register)------------------------
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})


// --------generatingToken----------------------------

userSchema.methods.getToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: Math.floor(Date.now() / 1000) + process.env.JWT_EXPIRE * 24 * 60 * 60
    })
}



const User = mongoose.model("User", userSchema);

export default User;