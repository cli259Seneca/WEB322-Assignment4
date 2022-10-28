/*********************************************************************************
* WEB322 – Assignment 05
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part 
of this
* assignment has been copied manually or electronically from any other source (including web sites) 
or 
* distributed to other students.
* 
* Name: Cheuk Lung Li Student ID: 149507212 Date: 31/10/2022
*
* Online (Cyclic) Link: ________________________________________________________
*
********************************************************************************/ 

//set environment port as 8080 local port
const HTTP_PORT = process.env.PORT || 8080;
//include the expressJS
const express = require("express");
const app = express();
const path = require("path");
var officeData = require("./modules/officeData.js");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//setup route to Home html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./views/home.html"));
});

//setup route to audio html
app.get('/audio', (req, res) => {
    res.sendFile(path.join(__dirname, "./views/audio.html"));
});

//setup route to video html
app.get('/video', (req, res) => {
    res.sendFile(path.join(__dirname, "./views/video.html"));
});

//setup route to table html
app.get('/table', (req, res) => {
    res.sendFile(path.join(__dirname, "./views/table.html"));
});

//setup route to list html
app.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname, "./views/list.html"));
});

//setup route to storefront html
app.get('/storefront', (req, res) => {
    res.sendFile(path.join(__dirname, "./views/storefront.html"));
});



//setup route to /PartTimer
app.get('/PartTimer', (req, res) => {
    officeData.getPartTimers().then((data) => {
        res.json(data);
    }).catch((err)=>{
        res.json({message:"No results"});
    });
});



//setup route to /employee/num
app.get('/employee/:employeeNum', (req, res) => {
    officeData.getEmployeeByNum(req.params.employeeNum).then((data) => {
        res.json(data);
    }).catch((err)=>{
        res.json({message:"No results"});
        console.log(err);
    });
});



//no matching route
app.use((req,res)=>{
    res.status(404).sendFile(path.join(__dirname, "/views/eddieisdead.jpg"));
})

//with initializing officeData, setup http server to listen on local port
officeData.initialize().then(function(){
    app.listen(HTTP_PORT, () => 
    {console.log("server listening on port: " + HTTP_PORT)}
    );
}).catch((err)=>{
    console.log("Fail to Start: "+ err);
})


