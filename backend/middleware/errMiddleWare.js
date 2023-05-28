const notFound =(req,res,next)=>{
    const err = new Error(`Not Found - ${req.originalUrl}`)
    res.status(400)
    next(err)
}

const errHandler = ()=>{
    const statusCode = res.statuscode === 200 ? 500 : res.statuscode
    res.status(statusCode)
    res.json({
        message: err.message
    });
};

module.exports = {notFound,errHandler}