const express = require("express");
const connectDb = require('./config/dbConnection');
const { errorHandler } = require("./middleware/errorHandler");


const dotenv = require("dotenv").config();
connectDb();

const app = express();
const port = process.env.PORT || 5003;

app.use(express.json());
    //if process.env.port is undefined, it will set it to 5000

app.use("/api/contacts", require("./routes/contactRoutes")); //define routes for contacat and user api
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});

