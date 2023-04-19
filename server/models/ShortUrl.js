import mongoose, { Schema } from "mongoose";

const ShortUrlSchema = new Schema({
    shortId : {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    originalUrl : {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
})

const ShortUrl = mongoose.model("ShortUrl", ShortUrlSchema);

export default ShortUrl;