'use strict'

$(document).ready(function () {

	$('.product-info').click(getProductId);

	if (window.location.href.search('product.html') != -1) {
		$.get("js/products.json", function (products) {
			renderProductImages(products);
			renderCarousel(products);
			renderProductInfo(products);
			renderSizes(products);
		});

		$('.product-btn').click(addItemToCart);
	};


	if (window.location.href.search('cart.html') != -1) {
		renderListOfProducts();
		displayTotalPrice();

		// $('.delete-btn').click(function(){
		// 	deleteProduct(target);
		// 	displayTotalPrice();
		// });
	};


	// funkciu delte musim dokoncit

	// function deleteProduct(target){
	// 	if(target.className === 'fas fa-times'){
	// 		console.log('mam ta');

	// 	}


		// let element = $(event.target).parent().parent();
		// console.log(`element: ${element}`);
		// $('#table-of-products').remove(element);
		
		
		// UI.prototype.deleteBook = function(target){
		// 	if(target.className === 'delete') {
		// 		target.parentElement.parentElement.remove();
		// 	}
		// }
	// }

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



	function renderListOfProducts() {
		let products;

		if (localStorage.getItem('products') === null) {
			products = [];
		} else {
			products = JSON.parse(localStorage.getItem('products'));

			for (let i = 0; i < products.length; i++) {
				let product = '';
				product += `<tr class="prod-item">`;
				product += `<th scope="row">${i + 1}</th>`;
				product += `<td>`;
				product += `<img src="${products[i].imgUrl}" alt="${products[i].name}">`;
				product += `</td>`;
				product += `<td>${products[i].name}</td>`;
				product += `<td>Size: ${products[i].size}</td>`;
				product += `<td>Quantity: <span class="prod-quantity">${products[i].quantity}</span></td>`;
				product += `<td>Price: <span class="prod-price">${products[i].finalPrice}<span> €</td>`;
				product += `<td class="delete-btn"><i class="fas fa-times" id="delete-btn"></i></td>`;

				$('#table-of-products').append(product);
				
				// vymazanie produktu z tabuľky (nie zo storage-u)

				// $("#delete-btn").on("click", function() {
				// 	$(this).closest("tr").remove();
				// });
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
	}


	// zisti product id
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
		//check ci je produkt v zlave
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


	// PRIDÁVANIE PRODUKTOV NA SALE STRANKU, neviem prečo nefunguje

	// $.get("js/products.json", function(prdcts) {
	// 	for (let prdct of prdcts) {
	// 		let productInfo = "";
	// 		productInfo +=  `<article class="card col-12 col-sm-6 col-md-3" data-id="1">`;
	// 		productInfo += `<img src="${product.url}" class="card-img-top first-img" alt="NIKE W AIR MAX 270">`;
	// 		productInfo += `<div class="card-body">`;
	// 		productInfo += `<h5 class="card-title">${product.name}`;
	// 		productInfo += `<p class="card-text">${product.description}</p>`;
	// 		productInfo += `<div>`;
	// 		productInfo += `<p class="price">${product.price} €</p>`;
	// 		productInfo += `<p class="price sale-price">${product.inSale} €</p>`;
	// 		productInfo += `</div>`;
	// 		productInfo += `<a href="product.html" class="btn btn-primary product-info">Details</a>`;
	// 		productInfo += `</div>`;
	// 		productInfo += `</article>`;

	// 		$("#list-of-items").append(productInfo);
	// 	}
	// });

	// FILTER NA SALE
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

	// LIGHTBOX NA GALLERY V ABOUT US

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

});