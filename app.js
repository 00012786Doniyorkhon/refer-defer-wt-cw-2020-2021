const constants = require('./conf/constants');
const port = constants.PORT;
const api = constants.API_VERSION;

const fs = require('fs');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');


global.root_dir = path.resolve(__dirname);

app.use('/data', express.static('data'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, (err)=>{
    if(err){
        throw err;
    }

    console.log("Running on: " + port);

});

// category router

const category_router = require('./router/category');
app.use(api + 'category', category_router);

// product router

const product_router = require('./router/product');
app.use(api + 'product', product_router);

// order router

const order_router = require('./router/order');
app.use(api + 'order', order_router);