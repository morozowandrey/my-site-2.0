
//////////////////////////////////LOGIC////////////////////////////////////////

function checkSection (){     		//функция определяет видно сейчас секцию на экране или нет
	$(".section").each(function(){	//проходим по всем секциям
		
		var $this = $(this),
			topEdge = $this.offset().top - 200,		//определяем верхний край секции (-200px что бы было видно 7ю секцию)
			bottomEdge = topEdge + $this.height(),	//определяем нижний край секции
			whereScroll = $(window).scrollTop();	//пределяем где скролл на странице
			
		if (topEdge < whereScroll && bottomEdge > whereScroll){		//если края у нас в окне то мы эту секцию видим

			var currentId = $this.data("section");
				reqLink = $(".header-nav__item-link").filter('[href="#' + currentId + '"]');	//определяем какую именно ссылку подсветить с помощью метода filter,
																						//фильтруем по тому href который совпадет с текущей секцией на экране
			reqLink.closest('.header-nav__item').addClass('active')		//подсвечивая классом active выделяем наш пункт
				.siblings().removeClass('active');					//удаляем посветку соседей
		}
	});
}

function showSection(section, isAnimate) {			//функция которая скролит страницу к нужной секции (секция которую нужно показать, анимированно или сразу)
	var direction = section.replace(/#/, ''),		//удаляем решетку из названия так как оно берется из атрибута href который с решеткой в названии
		reqSection = $('.section').filter('[data-section="' + direction + '"]'),		//фильтруем по href какую именно секцию показать
		reqSectionPos = reqSection.offset().top;	//определяем верхний край секции что бы при анимации проскролить именно к нему

	if (isAnimate) {
		$('body, html').animate({scrollTop: reqSectionPos}, 600);
	} else {
		$('body, html').scrollTop(reqSectionPos);
	}
}

// Navigation
	$('#navigation').on('click', function(e){
		e.preventDefault();
		$(this).addClass('open');
		$('#slide-out-menu').toggleClass('open');

		if ($('#slide-out-menu').hasClass('open')) {
			$('.menu-close').on('click', function(e){
				e.preventDefault();
				$('#slide-out-menu').removeClass('open');
			})
		}
	});

//////////////////////////////////EO LOGIC////////////////////////////////////////


//////////////////////////////////EVENTS////////////////////////////////////////

$(document).ready(function () {
	$('.header-nav__item-link').on('click', function(e){		//клик по навигации для пользователя
		e.preventDefault();

		showSection($(this).attr('href'), true);		//вызывается функция showSection но у же с анимированным эффектом
	});

	showSection(window.location.hash, false);			//при загруке страницы определяем какой именно хэш стоит в адресе и притягиваем страницу к нужному месту

});

$(document).scroll(function () {						//событие прокрутнки страницы
	checkSection()										//вызов функции проверяющей где находиться секция
});

$(".nav-side .nav-side-toggle").on("click", function(e) {
	  e.preventDefault();
	  $(this).parent().toggleClass("nav-open");
	});

//////////////////////////////////EO EVENTS////////////////////////////////////////