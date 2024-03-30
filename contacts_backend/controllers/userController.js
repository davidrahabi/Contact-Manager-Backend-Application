//@desc Register a user
//@route POST /api/isers/register
//@access public
const asyncHandler = require("express-async-handler");
const bcrypt =require("bcrypt"); //for generating hashed passwords
const User = require("../models/userModel");
const jwt = require("jsonwebtoken"); //to provide login token

const registerUser = asyncHandler(async (req, res)=>{
    const{username, email, password} = req.body;
    if(!username || !password || !email){ //if fields missing throw error
        res.status(400);
        throw new Error("Please fill out all fields");
    };
    const userExists = await  User.findOne({email});
    if(userExists){    
        res.status(400);
        throw new Error("User already registered");
    }
    //hash password
    const hashPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password", hashPassword);
    const user =  await User.create({
        username,
        email,
        password: hashPassword //register user with hashedpassword
    });
    console.log(`user created ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }
    else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({message: "Register the user"});
});

//@desc Login user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res)=>{
    const{email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("please fill all fields");
    }
    const user = await User.findOne({email});
    //compare passowrd with the hashedpasword
    if(user && (await bcrypt.compare(password, user.password))){ //if user with email exists and password matches
        
        //provide access token
        const accessToken = jwt.sign( //generate login access token
            {
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
            
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}
        );
        
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("password invalid");
    }
    res.json({message: "login the user"});
});

//@desc Current user info
//@route POST /api/users/current
//@access private

const currentUser = asyncHandler(async (req, res)=>{
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser};