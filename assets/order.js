
window.onload = function(){
    init_table();
};

function init_table(){

    let url = "/api/v1/order/get";

    fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            let orders = data;

            return orders.map(function(order) {

                let id = order.id;
                let product = get_product_name(order.product_id);
                let count = order.count;
                let date = order.created_at;
                
                var table = document.getElementById('order_table').getElementsByTagName('tbody')[0];
                
                var newrow = table.insertRow();
                newrow.innerHTML = 
                `
                <td>
                    ${product}
                </td>
                <td>
                    ${count}
                </td>
                <td>
                    ${date}
                </td>
                `;
            });

        })
        .catch(function(error) {
            alert(error);
        });

}

function get_product_name(id){
    for (product of window.products){
        if(product.id == id)
            return product.name;        
    }
}

