import dotenv from 'dotenv'
import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { mongoose } from 'mongoose'
import errorHandler from './server/middlewares/errorHandler.js'
import urlRoutes from './server/routes/urlRoutes.js'
import userRoutes from './server/routes/userRoutes.js'

const app = express()

dotenv.config()
// connecting to db
mongoose.connect(process.env.DB_URI).then(()=>{
    console.log('connection succesfull')
}).catch(err=>console.log(err))

const PORT = process.env.PORT || 8000


// ----------MiddleWares--------------------------
app.use(json())
app.use(urlencoded({extended : true}))
app.use(cors({ origin: true, credentials: true }))
// ----------MiddleWares--------------------------



//  -----------Routes-----------------------------


app.use('/api/v1/url', urlRoutes)
app.use('/api/v1/user', userRoutes)

//  -----------Routes-----------------------------



// ----------Error Handler------------------------

app.use(errorHandler);


app.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`)
})