'use strict'

$(document).ready(function () {

	$('.product-info').click(getProductId);
	cartCounter();
	displayEmptyCart();

	if (window.location.href.search('product.html') != -1) {
		$.get("js/products.json", function (products) {
			renderProductImages(products);
			renderCarousel(products);
			renderProductInfo(products);
			renderSizes(products);
		});
		cartCounter();
		$('.product-btn').click(function(){
			addItemToCart();
			cartCounter();
		});
	};

	if (window.location.href.search('cart.html') != -1) {
		renderListOfProducts();
		displayTotalPrice();
		cartCounter();
		emptyCartToastr();

		$('.delete-btn').on('click', function(){
			let rowID = Number($(this).closest('tr').attr('row-id'));

			$(this).closest('tr').remove();
			deleteProductFromLS(rowID);
			cartCounter();
			displayEmptyCart();
		});
	};

	if(window.location.href.search('about.html') != -1){
		galeryAboutUS();
		cartCounter();
	};

	if(window.location.href.search('sale.html') != -1){
		saleFilter();
		cartCounter();
	};

	if(window.location.href.search("checkout.html") != -1){
		displayTotalPrice();
		displayFinalPrice();
		submit();
	}
});

function cartCounter(){
	let arrayOfProducts;
	if (!localStorage.getItem('products')){
		arrayOfProducts = [];
		$('.badge').text(`0`);
	} else {
		arrayOfProducts = JSON.parse(localStorage.getItem('products'));
		let cartCount = arrayOfProducts.length;
		$('.badge').text(`${cartCount}`);
	}
}

function deleteProductFromLS(idNum){
	let productList = JSON.parse(localStorage.getItem('products'));
	
	productList.splice(idNum, 1);
	
	localStorage.setItem('products', JSON.stringify(productList));

	$('.badge').text(localStorage.length);
	
	displayTotalPrice();
	refreshIDs();
}

function refreshIDs(){
	let listOfProducts = $('.prod-item');
	for(let i = 0; i < listOfProducts.length; i++){
		listOfProducts[i].setAttribute('row-id', i);
	}
	let rowNumber = $('.row-num');
		for(let i = 0; i < rowNumber.length; i++){
			rowNumber[i].textContent = i+1;
		}	
}

function displayTotalPrice() {
	let products;

	if (localStorage.getItem('products') === null) {
		products = [];
	} else {
		products = JSON.parse(localStorage.getItem('products'));
		let totalPrice = 0;
		for (let i = 0; i < products.length; i++) {
			totalPrice += Number(products[i].quantity) * Number(products[i].finalPrice);
		}
		$('#sub-total').text(totalPrice.toFixed(2));
	}
};

function displayFinalPrice() {
	let subtotal = Number($("#sub-total").text());
	let finalprice = subtotal + 5.50;
	$("#final-price").text(finalprice.toFixed(2));
}

function renderListOfProducts() {
	let products;

	if (localStorage.getItem('products') === null) {
		products = [];
	} else {
		products = JSON.parse(localStorage.getItem('products'));

		for (let i = 0; i < products.length; i++) {
			let product = '';
			product += `<tr class="prod-item row" row-id="${i}">`;
			product += `<td class="col-3">`;
			product += `<img src="${products[i].imgUrl}" alt="${products[i].name}" class="img-fluid">`;
			product += `</td>`;
			product += `<td class="col-6 product-info">`;
			product += `<h4>${products[i].name}</h4>`;
			product += `<h5>Size: ${products[i].size}</h5>`;
			product += `<h5>Quantity: <span class="prod-quantity">${products[i].quantity}</span></h5>`;
			product += `</td>`;
			product += `<td class="col-12 col-lg-2 price-info">`;
			product += `<h4><span class="prod-price">${products[i].finalPrice}<span> €</h4>`;
			product += `</td>`;
			product += `<td class="delete col-3 col-lg-1">`;
			product += `<i class="fas fa-times delete-btn"></i>`;
			product += `</td>`;
			product += `</tr>`;

			$('#table-of-products').append(product);
		}
	}
};

function addItemToCart() {
	class productItem {
		constructor(name, finalPrice, size, quantity, imgUrl) {
			this.name = name;
			this.finalPrice = finalPrice;
			this.size = size;
			this.quantity = quantity;
			this.imgUrl = imgUrl;
		}
	}
	let products;
	let prodName = $('.product-name').text();
	let price = $('.product-price').text();
	let shoeSize = $('#size').val();
	let quantity = $('#quantity').val();
	let imgUrl = $('.img-src').attr('src');

	const product = new productItem(prodName, price, shoeSize, quantity, imgUrl);

	if (localStorage.getItem('products') === null) {
		products = [];
	} else {
		products = JSON.parse(localStorage.getItem('products'));
	}

	products.push(product);
	localStorage.setItem('products', JSON.stringify(products));

	toastr.options = {
		"closeButton": true,
		"positionClass": "toast-top-right",
		"preventDuplicates": true,
		"timeOut": "2500"
		};
	toastr["success"]("", "Item Added To Cart");
};

function getProductId() {
	let productID = $(this).parent().parent().attr('data-id');
	localStorage.setItem('product-id', productID);
};

function renderProductImages(products) {
	let productID = localStorage.getItem('product-id');
	let product = '';
	product += `<img src=${JSON.stringify(products[productID - 1].url[0])} alt=${JSON.stringify(products[productID - 1].name)} class="product-img" />`;
	product += `<img src=${JSON.stringify(products[productID - 1].url[1])} alt=${JSON.stringify(products[productID - 1].name)} class="product-img" />`;

	$('.product-imgs').append(product);
};

function renderCarousel(products) {
	let productID = localStorage.getItem('product-id');
	let product = '';
	product += `<div class="carousel-item active">`
	product += `<img src=${JSON.stringify(products[productID - 1].url[0])} class="d-block w-100 img-src" alt="...">`
	product += `</div>`;

	product += `<div class="carousel-item">`
	product += `<img src=${JSON.stringify(products[productID - 1].url[1])} class="d-block w-100" alt="...">`
	product += `</div>`;

	$('#carousel-item').append(product);
};

function renderProductInfo(products) {
	let productID = localStorage.getItem('product-id');
	let product = '';
	let price;
	
	if (products[productID - 1].inSale === 'true') {
		price = products[productID - 1].salePrice;
	} else {
		price = products[productID - 1].price;
	}
	product += `<h1 class="product-name">${products[productID - 1].name.toUpperCase()}</h1>`;
	product += `<p>${products[productID - 1].description}</p>`;
	product += `<p>${products[productID - 1].description}</p>`;
	product += `<p>${products[productID - 1].description}</p>`;
	product += `<h2><span class="product-price">${price}</span>€</h2>`;

	$('#product-info').prepend(product);
};

function renderSizes(products) {
	let productID = localStorage.getItem('product-id');
	let product = '';
	for (let size of products[productID - 1].sizes) {
		product += `<option value=${size}>${size}</option>`;
	}
	$('#size').append(product);
};

function saleFilter(){
	$("#btn-women").click(function() {
		$(".sale-article").hide();
		$(".women-article").show();
		$(this).addClass("selected-filter");
		$(this).siblings().removeClass("selected-filter");
	});
	$("#btn-men").click(function() {
		$(".sale-article").hide();
		$(".men-article").show();
		$(this).addClass("selected-filter");
		$(this).siblings().removeClass("selected-filter");
	});
	$("#btn-kids").click(function() {
		$(".sale-article").hide();
		$(".kids-article").show();
		$(this).addClass("selected-filter");
		$(this).siblings().removeClass("selected-filter");
	});
	$("#btn-all").click(function() {
		$(".sale-article").show();
		$(this).addClass("selected-filter");
		$(this).siblings().removeClass("selected-filter");
	});
}

function galeryAboutUS(){	
	let gallery = $('.gallery');

	gallery.find("img").css({
		opacity: 0.8
	}).on("mouseenter mouseleave", function(event) {
		if (event.type === "mouseenter") {
			$(this).stop().fadeTo(200, 1);
		} else {
			$(this).stop().fadeTo(200, 0.8);
		}
	});

	let overlay = $(`<div id="overlay"></div>`);
	overlay.appendTo("body").hide();

	gallery.find("a").on("click", function(event) {
		let href = $(this).attr("href");
		let image = $("<img>", {src: href, alt: "About Us Gallery"});

		overlay.html(image).show();
		event.preventDefault();
	});

	overlay.on("click", function() {
		overlay.hide();
	});

	$(document).on("keyup", function() {
		if (event.which === 27) {
			overlay.hide();
		}
	});
}

function displayEmptyCart() {
	let badge = $(".badge").text();
	if (badge === "0") {
		$(".empty-img").css("display", "block");
		$("#cart-table-with-products").css("display", "none");
	}
}

function emptyCartToastr() {
	$("#checkout-btn").on("click", function(event) {
		let subtotal = Number($("#sub-total").text());
		if (subtotal === 0) {
			event.preventDefault();
			toastr.options = {
				"closeButton": true,
				"positionClass": "toast-top-right",
				"preventDuplicates": true,
				"timeOut": "2500"
				};
			toastr["error"]("", "Your Cart Is Empty!");
		}
	});
}

function submit() {
	$("#checkout-form").on("submit", function(e) {
		e.preventDefault();
		localStorage.clear();
		toastr.options = {
			"closeButton": true,
			"positionClass": "toast-top-center",
			"preventDuplicates": true,
			"timeOut": "6000"
			};
		toastr.options.onHidden = function() { window.location.replace("index.html"); };
		toastr["success"]("Your order was completed successfully. We've sent you an e-mail confirmation. You will be automatically redirected to the homepage.", "Thank you.");
	});
}



// Soon...

// function submit() {
// 	$("#checkout-form").on("submit", function(e) {
// 		e.preventDefault();
// 		$.post(" ", function() {
// 			localStorage.clear();
// 			toastr.options = {
// 				"closeButton": true,
// 				"positionClass": "toast-top-center",
// 				"preventDuplicates": true,
// 				"timeOut": "6000"
// 				};
// 			toastr.options.onHidden = function() { window.location.replace("index.html"); };
// 			toastr["success"]("Your order was completed successfully. We've sent you an e-mail confirmation. You will be automatically redirected to the homepage.", "Thank you.");
// 		});
// 	});
// }