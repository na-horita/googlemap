function setting(){
	"use strict";
	

	//ページ内リンク
	//$('a[href^="#"]').not('.aco').click(function(){
//	var speed = 500;
//		var href= $(this).attr("href");
//		var target = $(href === "#" || href === "" ? 'html' : href);
//		var position = target.offset().top;
//		$("html, body").animate({scrollTop:position}, speed, "swing");
//		return false;
//	});


	//pageTop アニメーション
	var pagetop = $('#gotop');
	pagetop.click(function() {
		$("html,body").animate({ scrollTop: 0 }, 500);
		return false;
	});

	//ハンバーガーメニューによるスライド
	$("#menu").on("click", function() {
		$(".menu-trigger").toggleClass('active');
		$("#gnav").slideToggle();
		return false;
	});

	//ウィンドウ拡大縮小（メニュー開閉）に合わせてメニュー表示
	//フロントページと内部ページで挙動が異なる
		var current = 'small';
		//console.log("内部ページ");
		$(window).resize(function() {
			var wi = $(window).width();
			var bpoint = 640;
			if (wi <= bpoint && current !== 'small') {
			   $(".menu-trigger").removeClass('active');
			   $("#gnav").hide();           
				current = 'small';
			} else if (wi > bpoint && current !== 'big') {
			   $("#gnav").show();
				current = 'big';
			}
		});

	/*PC←→SP ImgChange*/
	$(window).on('load resize', function(){
		var wid = $(window).width();
		imgChange(wid);
	});
	
	function imgChange(wid){
		if( wid < 640 ){
			$('.chimg').each(function(){
				$(this).attr("src",$(this).attr("src").replace('_pc', '_sp')).css('visibility', 'visible');
			});

		}else if( wid > 640 ){
			$('.chimg').each(function(){
				$(this).attr("src",$(this).attr("src").replace('_sp', '_pc')).css('visibility', 'visible');
			});
		}
	}

	//スマホの時だけtelを有効にする
	var device = navigator.userAgent;
	if((device.indexOf('iPhone') > 0 && device.indexOf('iPad') == -1) || device.indexOf('iPod') > 0 || device.indexOf('Android') > 0){
		//text
		$('.tel').each(function(){
			var tel = $(this).data("tel");
			$(".tel").wrapInner("<a></a>");
			$("a",this).attr({href:"tel:"+tel});
		});
		//image
		$('.tel_img').each(function(){
			var tel_img = $(this).data("tel");
			$(".tel_img").wrap('<a href="tel:'+tel_img+'"></a>');
		});
	}


	/* Acodion */
	$('.aco').on('click', function(){
		var acobtn = $(this);
		acobtn.next().stop(false, true).slideToggle(200, function(){
			if(acobtn.hasClass('active')){
				acobtn.removeClass('active');
			}else{
				acobtn.addClass('active');
			}
		});
	});
}
