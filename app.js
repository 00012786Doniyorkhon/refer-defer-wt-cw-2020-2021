const express = require('express');
const app = express();
const port = 3113;

app.listen(port, (err)=>{
    if(err){
        throw err;
    }

    console.log("Running on: " + port);

});

app.get('/', function (req, res) {
    res.send('hello');
})

