$(document).ready(function(){
	$("#playgame").click(function(){
		$(".maintitle").fadeOut();
		$("#game_swf").hide();
		
		width = $("#gamearea").css("width");
		height =  $("#gamearea").css("height"); 
		padding = $("#gamearea").css("padding"); 
		marginLeft = width.replace(/[^-\d\.]/g, '');
		marginLeft = -marginLeft/2 - 15;
		
		$("#gamearea").removeClass("hidden")
			.css({width: 0, height: 0, marginLeft: 0, padding: "1px 15px"})
			.transition({width: width, marginLeft: marginLeft}, "medium")
			.transition({height: height, padding: padding}, "fast", function(){
				$("#gamearea .background").transition({backgroundColor: "#181818"}, "medium", function(){
					$("#game_swf").show();
					setTimeout(
						function(){
							$("#gamearea .background").hide();
						}, 100);
					
				});
			});
			
		window.scrollTo(0,0);
			
		return false;
	});
})