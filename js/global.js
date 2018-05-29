window.viewportUnitsBuggyfill.init();

$(document).ready(function(){
	//menu toggle
	
	window.addEventListener('load', function() {
	    new FastClick(document.body);
	}, false);

	$(".toggle").click(function(){	
		$("body").toggleClass("menu-open");
		$(this).blur();
		return false;
	});
	
	//lazy-load iframes
	$("iframe[data-url]").each( function(){
		$(this).attr("src", $(this).data("url"));
	});
	
	// handle docking
	if( !$("body").hasClass("docked") )
	{
		$( ".dockable" ).before("<div class='dockable-location'></div>");
		
		/*each(function(){
			$(this).data({offset: $(this).offset().top });	
		});*/
		
		$(window).scroll( updateScroll );
	}
	
	//close menu on link click
	
	$("#menu a").click(function()
	{
		if( $("body").hasClass("menu-open") )
		{
			$("body").removeClass("menu-open");
			var link = $(this).attr("href");
			setTimeout(function(){window.location = link;}, 250);
			return false;
		}
	});
	$("#social h3 a").each(function(){
		$(this).data("link", $(this).attr("href"));
	});
	
	$("#social h3 a").attr("href", null);
	$("#social h3 a").click(function(){
		link = $(this).data("link");
		if(link)
		{
			window.location = link;
		}
		
	});
	
		
	$("#social .mailing h3 a").click( function(){ 
		$("#social").toggleClass("open"); 
		return false; 
	});
	
	//screenshots
	
	
	$("#screenshots img").each(function(){
		src = $(this).attr("src");
		$div = $("<div><div class='hover'></div></div>").css({backgroundImage: "url(" + src + ")"});
		$(this).replaceWith($div);
	}); 
	
	
	//lazyload
	
//	$("[data-sleek]").sleek();
	
	cache();
	
	$("[data-appear]").appear();
	
});

function updateColor(color)
{
	switch(color)
	{
		case "light":
			setLight();
		break;
		
		case "dark":
			setDark();
		break;
	}
}

function setLight()
{
	$("body").addClass("light");
}

function setDark()
{
	$("body").removeClass("light");
}


function cache()
{
	$top = $(".top");
	$body = $("body");
	$logo = $(".logo");
	$dockable = $(".dockable");
}

var $top;
var $body;
var $logo;
var $dockable;


function updateScroll()
{
	shrink = $(window).scrollTop() > 300;
	snap = false;
	if( $dockable.length )
	{
		t = $top.offset().top - $dockable.prev().offset().top;
		
		delta = t + $(window).scrollTop();
		dockThreshold = $(".logo").css("top").replace(/[^-\d\.]/g, '');
		snap = (-delta <= dockThreshold);
		
	}
	
	topVisible = $top.height() - $(window).scrollTop() ;
	
	threshold = ( $(window).width() > 992 ) ? 125 : 75;
	dock = topVisible <= threshold;
	
	window.requestAnimationFrame( function(){
		$body.toggleClass("snapButton", snap);
		$body.toggleClass("docked", dock);
		$logo.toggleClass("small", shrink );			
	});
}



jQuery.fn.extend({
	
	sleek: function()
	{
		return this.each(function(){
			$target = $(this);
			
			$div = $('<div style="overflow:hidden; position: relative;"><div class="spinner"><div class="rect1"></div><div class="rect2"></div> <div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div></div>');
			$div.width( $target.width() );
			$div.height( $target.height() );
			$target.after( $div );
			$div.append( $target );
			
			$target.css({
				transition: "top .5s",
				position: "absolute",
				top: "100%"
			});

			$target.load(function(){
				$(this).css({
					top: "0%"
				});
			});
		})
		
	},
	
	appear: function()
	{
		return this.each(function(){
			$target = $(this);

			color = $target.attr("data-appear");
			backgroundImage = $target.css("background-image");
			url = backgroundImage.replace(/^url\((.*)\)/g, "$1");
			$target.css({backgroundImage: "none", backgroundColor: "none"});
			
			$img = $("<img/>").attr("src", url);
			$div = $("<div/>").css({
				width: "100%",
				height: "100%",
				position: "absolute",
				top: "0%",
				left: "0%",
				backgroundColor: color
			});
			
			$target.prepend($div);
			
			$img.load(function(){
				console.log("img " + backgroundImage + " loaded");
				$target.attr("style", "");
				$div.fadeOut( function(){
					$div.remove();
				} );
			});
			
			$img.load();
		})
	}
});