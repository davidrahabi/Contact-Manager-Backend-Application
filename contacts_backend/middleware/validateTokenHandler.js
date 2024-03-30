const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        
        token = authHeader.split(" ")[1]; //get token from string
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{ //verify the provided token
            if(err){
                res.status(401);
                throw new Error("User not authorized");
            }
            req.user = decoded.user;
            next();
        });
        if(!token){
            res.status(401);
            throw new Error("user not authorized or missing access token")
        }
    }
});




module.exports = validateToken;