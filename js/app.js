$(document).ready(function(){

	showTweets();
	setInterval(update,3000);

	$('#tweets').on('click','a',function(e){
		e.preventDefault();	
		//	Switch to user profile
		var user = $(this).attr("href");
		user = user.slice(1);
		app.user = user;
		app.profileImage = 'img/blank.jpg';
	
		showTweets();
	});

	$('#home').on('click',function(e){
		e.preventDefault();
		app.user = 'hamstar';
		app.profileImage = 'img/hamster.jpg';
		showTweets();
	});

	$('#update').on('click','a',function(e){
		e.preventDefault();
		showTweets();
	});


});

var app = {
	user: 'hamstar',
	tweets: 0,
	viewLimit: 20,
	profileImage: 'img/hamster.jpg'
};

var showTweets = function(){

	var tweets, $body = $('#tweets');
	$body.html('');
	$('.profile img').attr('src',app.profileImage);
	$('.profile a').text('@' + app.user);


	app.user === 'hamstar' ? tweets = streams.home : tweets = streams.users[app.user];
	app.tweets = tweets.length;

	tweets = tweets.slice(-app.viewLimit);

	tweets.forEach(function(tweet){
		var item = "<li>";
		item += "<a href=#" + tweet.user + ">@" + tweet.user +"</a>: ";
		item += "<span>" + tweet.message + "</span> ";
		item += "<abbr class='date timeago' title='"+ tweet.created_at.toISOString() +"'></abbr> " + "</span></li>";

		$body.prepend(item);
	});

	update();

};

var update = function(){
	//Update the "new tweets" bar
	var upd = $('#update');
	var tweets;
	app.user === 'hamstar' ? tweets = streams.home : tweets = streams.users[app.user];

	var newTweets = tweets.length - app.tweets;

	newTweets === 0 ? upd.slideUp() : upd.slideDown();
	var text = "<a href='#'>" + newTweets + ' new tweets.</a>';
	upd.html(text);

	//Update timestamps
	var dates = $('#tweets abbr');
	$.each(dates,function(index,item){
		var timestamp = $.timeago(new Date($(item).attr('title')));
		$(item).text(timestamp);
	});
};

