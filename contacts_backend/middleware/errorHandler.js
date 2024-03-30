const{ constants } = require("../constants");
const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500; 

    switch(statusCode){ //displaying possible errors
        case constants.VALIDATION_ERROR:
            res.json({title: "Validation failed", message: err.message, 
            stackTrace: err.stack});
            break;
        case constants.UNAUTHRIZED:
            res.json({title: "UNAUTHORIZED", message: err.message, stackTrace: err.stack});
            break;
        case constants.FORBIDDEN:
            res.json({title: "FORBIDDEN", message: err.message, stackTrace: err.stack});
            break;
        case constants.NOT_FOUND:
            res.json({title: "NOT FOUND", message: err.message, stackTrace: err.stack});  
            break;
        case constants.SERVER_ERROR:
            res.json({title: "SERVER ERROR", message: err.message, stackTrace: err.stack}); 
            break;   
        default:
            console.log("no errors");
    }

};

module.exports = {errorHandler};