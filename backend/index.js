const express = require("express");
const mongoose=require("mongoose");
const productRouter =require("./routes/productRoutes");
const app = express();
const cors = require("cors");
app.use(cors({origin:"*"}));

const mongoDbUrl = "mongodb+srv://anushka:anushka@cluster0.sixk1vs.mongodb.net/shopping_site?retryWrites=true&w=majority";

mongoose.connect(mongoDbUrl,{});

const db = mongoose.connection;

db.once("error", console.error.bind(console," Mongodb connection error: "));//both on or once can be written

db.on("open",()=>{
    console.log("Connected to MongoDB!");
});
app.use(express.json());//sice we are using json file so it is important to write this.
app.use(productRouter);//links it with the router.
app.listen(4000,"0.0.0.0",()=>{
    console.log("Server started at port 4000");
});