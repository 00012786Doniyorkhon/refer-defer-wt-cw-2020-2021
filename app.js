const constants = require('./conf/conf');
const express = require('express');
const app = express();

let port = constants.PORT;

app.listen(port, (err)=>{
    if(err){
        throw err;
    }

    console.log("Running on: " + port);

});

app.get('/', function (req, res) {
    res.send(constants.API_VERSION);
})

