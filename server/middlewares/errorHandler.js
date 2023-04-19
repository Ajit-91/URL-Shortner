
const errorHandler = (err, req, res, next) => {
    let message 
    let statusCode;
    
    console.log(err)
    console.log({code : err.code, name : err.name, message : err.message})

    if(err.statusCode) {
        statusCode = err.statusCode
        message = err.message
    }else if(err.name === "ValidationError"){
        statusCode = 400
        message = Object.values(err.errors).map(val => val.message)
    }else {
        statusCode = 500
        message = err.message
    }

    return res.status(statusCode).json({
        success: false,
        statusCode,
        error: message
    })
}

export default errorHandler
