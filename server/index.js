
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");  
const authRouter = require('./auth-api-route');
const adminRouter = require('./admin-api-route');
const userRouter = require('./user-api-route');

var app=express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api", userRouter);


app.get("/", function(req,res)
{
    res.send("Welcome to Express JS API Application");
});

var server=app.listen(3004,function() {});
console.log("Server Started. URL:http://localhost:3004");