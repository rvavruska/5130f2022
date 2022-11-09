/*
	Adds a product to the table
*/
function addProduct(product) {
	let table = document.getElementById('productTable');
	let newRow = table.insertRow(table.rows.length);
	row.insertCell(0).innerHTML = product.name;
	row.insertCell(1).innerHTML = product.date;
	row.insertCell(2).innerHTML = product.price;
	row.insertCell(3).innerHTML = '<button onclick=onUnsubscribeClick>Unsubscribe</button>';
	row.insertCell(4).innerHTML = '<a>Delete</a>';
}

/*
	Deletes a product from the table and makes the call to
	delete it from the database's association with the user.
*/
function deleteProduct(product) {
	var table = document.getElementById("productTable");
	for (var i = 0, row; row = table.rows[i]; i++) {
		if (row.cells[0] == product.name) {
			table.deleteRow(i);
			break;
	   }  
	}
}

function onAddProductClick() {

}

function onUnsubscribeClick () {
	
}