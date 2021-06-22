const express = require('express');
const fs = require('fs');

var category_router = express.Router();

// returns all categories

category_router
    .get(
        '/get', 
        function(request, response){

            let categories;
            fs.readFile(root_dir + '/data/category.json', 'utf8', function (err, data) {
                if (err){
                    throw err;
                }
                
                categories = JSON.parse(data); 

                return response.json(
                    categories
                );

            });

        }
    );

// return category by id

category_router
    .get(
        '/get/:id',
        function(request, response){

            let id = request.params.id;

            fs.readFile(root_dir + '/data/category.json', 'utf8', function (err, data) {
                if (err){
                    throw err;
                }
                let categories = JSON.parse(data);

                let found = false;
                let category;

                for (let category of categories) {
                    if(category.id == id){
                        found = true;
                        category = category;
                        break;
                    }
                }

                if(found){
                    return response.json(
                        category
                    );
                }
    
                return response.json({
                    success: false,
                    message: `Category (${id}) not found`                    
                });

            });

        }
    );

module.exports = category_router;