window.onload = function(){
    init_products_selectpicker();
    if(action=='add')
        document.getElementById('action').innerHTML = 'add'
};

var button = document.getElementById("action");
button.addEventListener("click",function(e){
    if(action && action == 'add')
        add();    
}, false);

function init_products_selectpicker(){
    let products = window.products;

    if(products && products.length){
        for (var i = 0; i < products.length; i++) {
            var option = document.createElement("option");
            option.value = products[i].id;
            option.text = products[i].name;
            document
                    .getElementById('product_id')
                        .appendChild(option);
        }
    }

}

async function add(){
    let order = {
        product_id: document.getElementById('product_id').value,
        count: document.getElementById('count').value
    };
    
    let response = await fetch('/api/v1/order/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(order)
    });
      
    let result = await response.json();
    
    if(result && result.id){
        alert('Operation succeeded!');
        location.href = '/order';
    }else{
        alert('Try again!')
    }
}
