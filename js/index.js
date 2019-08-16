// zobrazovanie elementov a blokov HTML

$(document).ready(function () {
	
	// Jquery pre navigaciu
	// na zaciatku skryjem doplnkove bloky menu a bude si ich volat na hover alebo click;
	$('#hover-menu').hide();
	$('#mobile-menu').hide();

	let width = $(window).width();
	//sirka pre male obrazovky
	if (width <= 770) {
		$('#navigation-mobile-devices').show();
		$('#horizontal-navigation').hide();

		// klik na hamburger menu, porovna ci je #mobile-menu zobrazene alebo nie. Ak neni zobraz ho...
		$('#btn-mobile-menu').click(function () {
			if($('#mobile-menu').css('display') === 'none'){
				$('#mobile-menu').fadeIn();
				$('.fa-bars').removeClass('fa-bars').addClass('fa-times');
			}else{
				$('#mobile-menu').fadeOut();
				$('.fa-times').removeClass('fa-times').addClass('fa-bars');
			}
		}); 
	} else {
		// velke obrazovky
		$('#navigation-mobile-devices').hide();
		$('#horizontal-navigation').show();

		$('#hover-menu-btn').hover(function () {
			$('#hover-menu').fadeIn("slow");
		})
		$('#hover-menu').mouseleave(function () {
			$('#hover-menu').fadeOut();
		})
	}

	// jquery pre zobrazenie vyhladavaca velke obrazovky
	$('#search-btn').click(function(){
		if($('#search-block').css('display') == 'none'){
			$('#search-block').fadeIn();
			$('.fa-search').removeClass('fa-search').addClass('fa-times');
		}else{
			$('#search-block').fadeOut();
			$('.fa-times').removeClass('fa-times').addClass('fa-search');
		}
	})	
});


