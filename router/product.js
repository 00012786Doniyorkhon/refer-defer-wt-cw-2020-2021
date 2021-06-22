const express = require('express');
const fs = require('fs');
const RandomGenerator = require(root_dir + '/util/random-generator');

var product_router = express.Router();

// returns all products

product_router
    .get(
        '/get', 
        function(request, response){
        
            // get all
            let products;

            fs.readFile(root_dir + '/data/product.json', 'utf8', function (err, data) {
                if (err){
                    throw err;
                }
                products = JSON.parse(data);

                response.json(
                    products
                );

            });

        }
    );

// returns product by id

product_router
    .get(
        '/get/:id',
        function(request, response){

            let id = request.params.id;
            let product;
            
            fs.readFile(root_dir + '/data/product.json', 'utf8', function (err, data) {
                if (err){
                    throw err;
                }
                products = JSON.parse(data);
    
                let found = false;
    
                for (let element of products) {
                    if(element.id == id){
                        found = true;
                        product = element;
                        break;
                    }
                }
    
                if(found){
                    return response.json(
                        product
                    );
                }
    
                return response.json({
                    success: false,
                    message: `Product (${id}) not found`                    
                });
    
            });

        }
    );

// add product

product_router
    .post(
        '/add',
        function(request, response){

            let name = request.body.name;
            let category_id = request.body.category_id;
            let price = request.body.price;
            let description = request.body.description;

            let product = {
                id: new RandomGenerator().get(),
                name: name,
                category_id: category_id,
                price: price,
                description: description,
                created_at: new Date(),
                updated_at: null
            }

            fs.readFile(root_dir + '/data/product.json', 'utf8', function (err, data) {
                if (err){
                    throw err;
                }
                var products = JSON.parse(data);

                products.push(product);

                fs.writeFile(root_dir + '/data/product.json', JSON.stringify(products), (err) => {
                    if (err){
                        throw err;
                    }
                });

                return response.json(
                    product
                );

            });

        }
    );

// edit product

product_router
    .post(
        '/edit/:id',
        function(request, response){

            var id = request.params.id;
            let product;

            fs.readFile(root_dir + '/data/product.json', 'utf8', function (err, data) {
                if (err){
                    throw err;
                }
                
                let products = JSON.parse(data);
                
                var found = false;

                for (let element of products) {
                    if(element.id == id){
                        found = true;
                        product = element;
                        break;
                    }
                }

                if(found){
                    
                    let name = request.body.name;
                    let category_id = request.body.category_id;
                    let price = request.body.price;
                    let description = request.body.description;
        
                    product.name = name;
                    product.category_id = category_id;
                    product.price = price;
                    product.description = description;
                    product.updated_at = new Date();

                    products = products.filter(prod => prod.id != id);
                    products.push(product);
    
                    fs.writeFile(root_dir + '/data/product.json', JSON.stringify(products), (err) => {
                        if (err){
                            throw err;
                        }
                    });
    
                    return response.json(
                        {
                            success: true
                        }
                    );

                }

                return response.json({
                    success: false,
                    message: `Product (${id}) not found`
                });

            });

        }
    );

// remove product

product_router.route('/remove/:id')
    .get(function(request, response){
        let id = request.params.id;

        fs.readFile(root_dir + '/data/product.json', 'utf8', function (err, data) {
            if (err){
                throw err;
            }
            let products = JSON.parse(data);

            let found = false;

            for (let element of products) {
                if(element.id == id){
                    found = true;
                    break;
                }
            }

            if(found){
                
                products = products.filter(prod => prod.id != id);
                
                fs.writeFile(root_dir + '/data/product.json', JSON.stringify(products), (err) => {
                    if (err){
                        throw err;
                    }
                });

                return response.json(
                    {
                        success: true
                    }
                );

            }

            return response.json({
                success: false,
                message: `Product (${id}) not found`
            });

        });

    });


module.exports = product_router;