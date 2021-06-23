
var product_id = '';

window.onload = function(){
    init_categories_selectpicker();
    if(action=='edit'){
        
        product_id = new URLSearchParams(window.location.search).get('id');

        let url = "/api/v1/product/get/" + product_id;
        
        fetch(url)
            .then((resp) => resp.json())
            .then(function(data) {
                console.log(data)
                var product = data;
                if(product && product.id){
                    document.getElementById('name').value = product.name;
                    document.getElementById('category_id').value = product.category_id;
                    document.getElementById('price').value = product.price;
                    document.getElementById('description').value = product.description;
                }
            
            })
            .catch(function(error) {
                alert(error);
            });
        document.getElementById('action').innerHTML = 'edit'
    }else{
        document.getElementById('action').innerHTML = 'add'
    }

};

var button = document.getElementById("action");
button.addEventListener("click",function(e){
    if(action && action == 'edit')
        edit();
    else
        add();
    
}, false);

function init_categories_selectpicker(){
    let categories = window.categories;

    if(categories && categories.length){
        for (var i = 0; i < categories.length; i++) {
            var option = document.createElement("option");
            option.value = categories[i].id;
            option.text = categories[i].name;
            document
                    .getElementById('category_id')
                        .appendChild(option);
        }
    }

}

async function add(){
    let product = {
        name: document.getElementById('name').value,
        category_id: document.getElementById('category_id').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value
    };
    
    let response = await fetch('/api/v1/product/add/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(product)
    });
      
    let result = await response.json();
    
    if(result && result.id){
        alert('Operation succeeded!');
        location.href = '/';
    }else{
        alert('Try again!')
    }

}

async function edit(){
    let product = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value,
        category_id: document.getElementById('category_id').value
    };
    
    let response = await fetch('/api/v1/product/edit/' + product_id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(product)
    });
      
    let result = await response.json();
    
    if(result && result.success){
        alert('Operation succeeded!');
        location.href = '/';
    }else{
        alert('Try again')
    }

}
