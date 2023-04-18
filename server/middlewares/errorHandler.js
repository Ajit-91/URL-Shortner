
const errorHandler = (err, req, res, next) => {
    console.log(err)
    const message = err.message || 'Internal Server Error'
    const statusCode = err.statusCode || 500

    return res.status(statusCode).json({
        success: false,
        statusCode,
        error: message
    })
}

export default errorHandler
