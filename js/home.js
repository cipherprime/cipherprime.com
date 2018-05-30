$(document).ready( function(){

	setInterval( moveStatic, 66);
	console.log( "Eh ");
});


function moveStatic(){
	window.requestAnimationFrame( function(){
		$(".overlay").css({
			backgroundPositionX: Math.floor(Math.random() * 100)+"px",
			backgroundPositionY: Math.floor(Math.random() * 100)+"px"
		});
	});
}
