const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({ //model for creating contacts
    user_id: {
        type: mongoose.Schema.Types.ObjectId, //associated contact with the user that created it
        required: true,
        ref: "User",    
    },
    name: {
        type: String,
        required: [true, "Please add contact name"]
    },

    email: {
        type: String,
        required: [true, "Please add contact email"]
    },

    phone: {
        type: String,
        required: [true, "Please add contact phone number"]
        
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Contact", contactSchema);