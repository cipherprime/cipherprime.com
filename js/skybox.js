var i = -1;

$(document).ready(function(){
	
	$(window).on({
		mousemove: function( event )
		{
			rX = event.clientX - $(window).width()/2;
			rY = event.clientY - $(window).height()/2;
			x = rX / $(window).width() * 90;
			y = rY / $(window).height() * 90;
			
			rotate(x, y);
		},
	});
	
	window.ondeviceorientation = function(event)
	{
//		$(".stat").html(Math.round(event.alpha) + ", " + Math.round(event.beta) + ", " + Math.round(event.gamma));
		
		rotate( -event.gamma, -event.beta );
	};
	
});

function rotate( x, y )
{
	$(".skybox").css({ perspective: "500px", rotateY: x + "deg", rotateX: y + "deg"});
}

