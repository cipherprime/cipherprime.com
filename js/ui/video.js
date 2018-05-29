var player;
var wasLight;

var playerVars = {
	'origin' : 'staging.cipherprime.com',
	'modestbranding' : 1,
	'showinfo' : 0,
	'rel' : 0,
	'theme' : 'light',
	'autohide' : 1
}

$(document).ready(function(){
	
	$("[data-youtube]").each(function(){
		id = $(this).attr("data-youtube");
		$(this).append('<i class="fa fa-youtube-play"></i>');
		$(this).css({backgroundImage: "url(//img.youtube.com/vi/" + id + "/hqdefault.jpg)"});
		$(this).click(function(){
			player = new YT.Player($(this).attr("id"), {
			    height: $(this).height(),
			    width: $(this).width(),
			    videoId: id,
			    playerVars: playerVars,
			    
			    events: {
				    'onReady' : function()
				    {
				    	player.playVideo();
				    }
			    }
			});
		});
	})
	
});


function onYouTubeIframeAPIReady() {
	if( isMobile.any ) return false;
	
 	$("a[rel='trailer']").click(function(){
		$(".maintitle").fadeOut("fast");
		

		if( player == null )
		{
			wasLight = $("body").hasClass("light");
			$("body").addClass("light");
		
			href = $(this).attr("href");
			href = href.substring( href.lastIndexOf("/") + 1 );
			player = new YT.Player('player', {
			    height: '100%',
			    width: '100%',
			    videoId: href,
			    playerVars: playerVars,
			    
			    events: {
				    'onReady' : function()
				    {
				    	player.playVideo();
				    },
				    'onStateChange': onPlayerStateChange
			    }
			});
		} else {
			player.playVideo();
		}
		
		window.scrollTo(0,0);
		return false;
	});
}
 
function onPlayerStateChange()
{
	if( player.getPlayerState() == 0 )
	{
		$("#player").replaceWith("<div id='player'></div>");
		$(".maintitle").fadeIn("fast");
		if( !wasLight )
		{
			$("body").removeClass("light");
		}
		
		player = null;
	}
}