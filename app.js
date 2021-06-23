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


app.set('view engine', 'pug');
app.use('/assets', express.static('assets'));

// index page

app.get('/', (request, response)=>{
    response.render('product', {
        page: "Products",
        categories: fs.readFileSync(root_dir + '/data/category.json', 'utf8')
    });
});

app.get('/add', (request, response)=>{
    response.render('product_modify', {
        page: "Product: Create",
        categories: fs.readFileSync(root_dir + '/data/category.json', 'utf8')
    });
});

app.get('/edit', (request, response)=>{
    response.render('product_modify', {
        page: "Product: Edit",
        categories: fs.readFileSync(root_dir + '/data/category.json', 'utf8'),
        action: 'edit'
    });
});

app.get('/order', (request, response)=>{
    response.render('order', {
        page: "Orders",
        products: fs.readFileSync(root_dir + '/data/product.json', 'utf8')
    });
});

app.get('/order/add', (request, response)=>{
    response.render('order_modify', {
        page: "Order: add",
        products: fs.readFileSync(root_dir + '/data/product.json', 'utf8'),
        action: 'add'
    });
});
