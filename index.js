import dotenv from 'dotenv'
dotenv.config()

import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { mongoose } from 'mongoose'
import errorHandler from './server/middlewares/errorHandler.js'
import urlRoutes from './server/routes/urlRoutes.js'
import userRoutes from './server/routes/userRoutes.js'

const app = express()

// connecting to db
mongoose.connect(process.env.DB_URI).then(()=>{
    console.log('connection succesfull')
}).catch(err=>console.log(err))

const PORT = process.env.PORT || 8000


// ----------MiddleWares--------------------------
app.use(json()) // parses JSON string and converts it into JS Object and attaches to req.body
app.use(urlencoded({extended : true})) // parses URL-encoded data and converts it into JS Object and attaches to req.body
app.use(cors({ origin: true, credentials: true }))
// ----------MiddleWares--------------------------



//  -----------Routes-----------------------------
app.use('/api/v1/url', urlRoutes)
app.use('/api/v1/user', userRoutes)


app.get('/', (req, res)=>{
    res.send('URL Shortener API')
})
//  -----------Routes-----------------------------



// ----------Error Handler------------------------
app.use(errorHandler);


app.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`)
})
