'use strict'

$(document).ready(function () {
	
	$('.product-info').click(getProductId);

	$.get("js/products.json", function (products) {
		renderProductImages(products);
		renderProductInfo(products);
	});
});


// zisti product id
function getProductId() {
	let productID = $(this).parent().parent().attr('data-id');
	localStorage.setItem('product-id', productID);
};

function renderProductImages(products) {
	let productID = localStorage.getItem('product-id');
	let product = '';
	product += `<img src=${JSON.stringify(products[productID - 1].url[0])} alt=${JSON.stringify(products[productID - 1].name)} class="product-img"/>`;
	product += `<img src=${JSON.stringify(products[productID - 1].url[1])} alt=${JSON.stringify(products[productID - 1].name)} class="product-img"/>`;

	$('.product-imgs').append(product);
};

function renderProductInfo(products) {
	let productID = localStorage.getItem('product-id');
	let product = '';
	let price;
	//check ci je produkt v zlave
	if(products[productID-1].inSale === 'true'){
		price = products[productID-1].salePrice;
	}else{
		price = products[productID-1].price;
	}

	product += `<h1>${products[productID-1].name.toUpperCase()}</h1>`;
	product += `<p>${products[productID-1].description}</p>`;
	product += `<p>${products[productID-1].description}</p>`;
	product += `<p>${products[productID-1].description}</p>`;
	product += `<h2>${price}€</h2>`;

	$('#product-info').prepend(product);
}