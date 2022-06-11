const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req,res){
    res.sendFile(__dirname + '/index.html');
    console.log(res.statusCode);

})

app.post("/", function(req,res){
    console.log(req.statusCode);
    const cityId = req.body.citycode;
    console.log(cityId)
    res.send(`${cityId}`)
})

app.listen(4000, function(){
    console.log('Server has been started , listening on port 4000')
})