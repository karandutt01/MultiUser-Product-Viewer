const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode || 500;
    res.json({message: err.message, statusCode:statusCode})
}

module.exports = errorHandler;