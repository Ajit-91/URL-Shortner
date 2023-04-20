import catchError from "../utils/catchError.js";
import { nanoid } from 'nanoid'
import ShortUrl from "../models/ShortUrl.js";
import AppError from "../utils/AppError.js";
import redisClient from "../config/redisClient.js";


export const shorten = catchError(async (req, res) => {
    const { url } = req.body;
    if (!url) {
        throw new AppError(400, 'Please provide a url')
    }
    //fetch URL if it exists in cache ~ else in the database ~ 
    //else create, store, cache a newly generated URL

    await redisClient.connect();

    let foundUrl

    // check in cache
    foundUrl = await redisClient.get(url);

    if(foundUrl){
        console.log('cache hit')
    }else{
        console.log('cache miss')
    }

    if (!foundUrl) {
        // check in database
        foundUrl = await ShortUrl.findOne({ originalUrl: url });
    }

    if (!foundUrl) {
        // create new url if not found in db
        foundUrl = await ShortUrl.create({
            originalUrl: url,
            shortId: nanoid(10)
        })

        const user = req.user;
        user.urls.push(foundUrl._id);
        await user.save();
    }

    if(typeof foundUrl !== 'string'){ // foundUrl will be object in case of cache miss
          // store in cache
          await redisClient.set(url, JSON.stringify(foundUrl));
    }

    if(typeof foundUrl === 'string'){ // foundUrl will be string in case of cache hit
        foundUrl = JSON.parse(foundUrl)
    }

    let newUrl = `${process.env.ROOT_URL}${req.baseUrl}/${foundUrl.shortId}`;

    // close the connection
    await redisClient.disconnect();


    res.status(200).json({
        success: true,
        data: newUrl
    })

})


export const redirect = catchError(async (req, res) => {
    const { shortId } = req.params;
    if (!shortId) {
        throw new AppError(400, 'Please provide a short url')
    }

    const foundUrl = await ShortUrl.findOne({ shortId });
    if (!foundUrl) {
        throw new AppError(404, 'url not found')
    }

    res.redirect(foundUrl.originalUrl)
})