const mongoose = require("mongoose");

const userSchema = mongoose.Schema({ //model for user
    username: {
        type:String,
        required:[true, "Please add username"],
    },
    email:{
        type:String,
        required:[true, "Please add email"],
        unique: [true, "Email address already taken"]
    },
    password: {
        type:String,
        required:[true, "Please add password"],
    }
},
    {
        timestamps:true
    }
);

module.exports = mongoose.model("User", userSchema);