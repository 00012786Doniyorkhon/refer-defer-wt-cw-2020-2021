const express = require('express');
const fs = require('fs');
const RandomGenerator = require(root_dir + '/util/random-generator');

var order_router = express.Router();

// returns all orders

order_router
    .get(
        '/get', 
        function(request, response){

            let orders;
            fs.readFile(root_dir + '/data/order.json', 'utf8', function (err, data) {
                if (err){
                    throw err;
                }
                
                orders = JSON.parse(data); 

                return response.json(
                    orders
                );

            });

        }
    );

// add order

order_router
    .post(
        '/add',
        function(request, response){

            let product_id = request.body.product_id;
            let count = request.body.count;

            let order = {
                id: new RandomGenerator().get(),
                product_id: product_id,
                count: count,
                created_at: new Date()
            }

            fs.readFile(root_dir + '/data/order.json', 'utf8', function (err, data) {
                if (err){
                    throw err;
                }
                var orders = JSON.parse(data);

                orders.push(order);

                fs.writeFile(root_dir + '/data/order.json', JSON.stringify(orders), (err) => {
                    if (err){
                        throw err;
                    }
                });

                return response.json(
                    order
                );

            });

        }
    );

module.exports = order_router;