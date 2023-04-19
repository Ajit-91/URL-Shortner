import catchError from "../utils/catchError.js";
import { nanoid } from 'nanoid'
import ShortUrl from "../models/ShortUrl.js";
import AppError from "../utils/AppError.js";

export const shorten = catchError(async (req, res, next) => {
    const { url } = req.body;
    if (!url) {
        throw new AppError(400, 'Please provide a url')
    }
    //fetch URL if it exists in cache ~ else in the database ~ 
    //else create, store, cache a newly generated URL


    let foundUrl, newUrl
    // check in cache



    if (!foundUrl) {
        // check in database
        foundUrl = await ShortUrl.findOne({ originalUrl: url });
    }

    if (!foundUrl) {
        // create new url if not foundUrl
        foundUrl = await ShortUrl.create({
            originalUrl: url,
            shortId: nanoid(10)
        })

        const user = req.user;
        user.urls.push(foundUrl._id);
        await user.save();
    }

    // newUrl = `${req.protocol}://${req.hostname}${req.baseUrl}/${foundUrl.shortId}`;
    newUrl = `${req.protocol}://${req.hostname}`;
    if (req.hostname === 'localhost' && req.port !== '80' && req.port !== '443') {
        newUrl += `:${req.socket.localPort}`;
    }
    newUrl += `${req.baseUrl}/${foundUrl.shortId}`;
    console.log({ protocol: req.protocol, hostname: req.hostname, baseUrl: req.baseUrl , port : req.socket.localPort})

    // cache the found url


    res.status(200).json({
        success: true,
        data: newUrl
    })

})


export const redirect = catchError(async (req, res, next) => {
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