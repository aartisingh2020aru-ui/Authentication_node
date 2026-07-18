const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const useRoute = require("./routes/autheRoutes")

mongoose.connect(
    "mongodb+srv://aartisingh2020aru_db_user:aartisingh12345@cluster0.lkquzoa.mongodb.net/?appName=Cluster0"


).then(() => {
    console.log("Mongo Db connected successfully!");
}).catch((err) => {
    console.log("Connection Failed!");
    // console.log(err.message);
    console.error(err);
});


app.use(express.json());


// router
app.use('/user', useRoute);

app.listen(8000,()=>{
    console.log("Server is running on port number 8000");
});