
window.onload = function(){
    init_table();
};

function init_table(){

    let url = "/api/v1/product/get";

    fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            let products = data;

            return products.map(function(product) {

                let id = product.id;
                let category = get_category_name(product.category_id);
                let name = product.name;
                let price = product.price;
                let description = product.description;
                
                var table = document.getElementById('products_table').getElementsByTagName('tbody')[0];
                
                var newrow = table.insertRow();
                newrow.innerHTML = `<td>${name}</td><td>${category}</td><td>${price}</td><td>${description}</td><td><a href="/edit?id=${id}" class="btn btn-warning">edit</a><span>&nbsp;</span><button class="btn btn-danger" onclick="remove('${id}');">remove</button></td>`;
            })
        })
        .catch(function(error) {
            alert(error);
        });

}

function get_category_name(id){
    for (category of window.categories){
        if(category.id == id)
            return category.name;        
    }
}

function remove(id){
    if (confirm('Delete this product?')) {

        let url = "/api/v1/product/remove/" + id;

        fetch(url)
            .then((resp) => resp.json())
            .then(function(data) {
                if(data && data.success)
                    alert("Operation succeeded!");
                    location.href = '/';
            })
            .catch(function(error) {
                console.log(error)
            });
    }

}
