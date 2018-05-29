var carouselInterval = 0;
var carouselDelay = 8000;

$(document).ready(function(){
	
	// scene navigation
	$(".scene").first().addClass("visible");
	$(".scene").not(".visible").hide();
	
	$("nav .next").click(next);
	$("nav .prev").click(prev);
	
	$(document).keydown( function( event ){
		if( event.which == 39 ) next();
		if( event.which == 37 ) prev();
		if( event.which == 13 ) 
		{
			window.location = $(".scene.visible .maintitle a").attr("href");
		}
	});
	
	$(".scene img").touchwipe({
		wipeLeft:  next,
		wipeRight: prev,
	});
	
	$(".product img").each(function(){
		$(this).data("img", $(this).attr("src"));
		$(this).attr("src", "");
	});
	
	display( $(".scene.visible") );
	
	$(window).resize(sizeImg);
	window.ontouchstart = function () {};
	sizeImg();
	
	carouselInterval = setInterval(next, carouselDelay);
	
});

function updateBackground()
{
	var index = $(".scene").index( $(".scene.visible") );
	var count = $(".scene").length;
	var percent = (index/count * 100)+"% center"

	$("body").css({backgroundPosition: percent});
}

function next(){
	var next = $(".scene.visible").next(".scene");
	if( next.length == 0 ) next = $(".scene").first();
	proceedTo(next);
}

function prev(){
	var next = $(".scene.visible").prev(".scene");
	if( next.length == 0 ) next = $(".scene").last();
	proceedTo(next);
}

function proceedTo( scene )
{
	var current = $(".scene.visible");
	current.removeClass("visible").fadeOut("slow");
	scene.addClass("visible").fadeIn("slow");
	updateColor( scene.data("color") );
	updateBackground();
	
	display( scene );
	
	clearInterval(carouselInterval);
	carouselInterval = setInterval(next, carouselDelay);
}

function display( $scene )
{	
	$img = $scene.find(".product img");
	
	if( !$img.data("loaded") )
	{
		$img.attr("src", $img.data("img"))
			.hide()
			.load(function(){
				sizeImg();
				$img.fadeIn("medium");
				$img.data("loaded", true);
			});
	}
}

function sizeImg(){
	
	$maintitle =  $(".visible .maintitle");
	native = 2200/700;
	height = $(window).height() - ( $maintitle.offset().top + $maintitle.height() );
	console.log( $maintitle.height() );
	width = native * height;
	
	$(".scene .product img").height( height );
	$(".scene .product img").width( width );
	
	actualWidth  = $(".scene.visible .product img").width();
	
	window.requestAnimationFrame( function() {
		if( actualWidth > width )
		{
			$(".scene .product img").height( actualWidth / native ).css({top: "0px"});
			$(".scene .product").height( height );
		} else {
			$(".scene .product img").css({top: "auto"});
			$(".scene .product").height( "50%" );
		}
		
		$(".scene .product img").css({marginLeft: -actualWidth/2});
	});
	
	
}