import rateLimit from "express-rate-limit";
import AppError from "../utils/AppError.js";

const createShortUrlLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,  // 1 hour in milliseconds
  max: process.env.URL_CREATION_LIMIT,  // maximum number of requests per windowMs
  keyGenerator: function (req, res) {
    return req.user._id.toString(); // use the user ID as the rate limiting key
  },
  handler: (req, res, next) => {
    return next(new AppError(429, "Max limit (10 per Hour) for creating short url exceeded, please try again after an hour"));
  },
});


export default createShortUrlLimiter;
