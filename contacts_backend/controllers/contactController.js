const asyncHandler = require("express-async-handler"); // asyncHandler will automatically pass error to the handler
                                                        //without needing a bunch of try catch blocks

const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res)=>{
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json({contacts}); //display all contacts in json format
});

//@desc Create new contact
//@route POST /api/contacts
//@access private
const createContact =asyncHandler( async (req, res)=>{
    console.log("The request body is", req.body);

    const{name,email,phone} = req.body;
    if(!name || !email || !phone){          //error handler for empty body
        res.status(400);
        throw new Error("All fields required")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });

    res.status(201).json(contact); //display contact after creation successful
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler( async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){ // if contact not found throw error
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler( async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }

    //if contact id does not belong to current user
    if(contact.user_id.toString() !== req.user.id){
        res.status(400);
        throw new Error("This user does not have permission to update other users contacts");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true});
    res.status(200).json(updatedContact); //display contact after updated successfully
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler( async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){ //if contact not found
        res.status(404);
        throw new Error("contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){//if contact id does not belong to current user
        res.status(400);
        throw new Error("This user doesn't have permission to update other users contacts");
    }
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact); //display deleted contact
});

module.exports = { getContacts,
createContact,
getContact,
updateContact,
deleteContact
 };