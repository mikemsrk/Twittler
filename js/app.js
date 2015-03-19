$(document).ready(function(){

	showTweets();
	setInterval(update,3000);

	$('#tweets').on('click','a',function(e){
		e.preventDefault();
		var user = $(this).attr("href");
		user = user.slice(1);
		app.user = user;
		showTweets();
	});

	$('#home').on('click',function(e){
		e.preventDefault();
		app.user = undefined;
		showTweets();
	});

	$('#update').on('click','a',function(e){
		e.preventDefault();
		showTweets();
	});


});

var app = {
	user: undefined,
	tweets: 0
};

var showTweets = function(){

	var tweets, $body = $('#tweets');
	$body.html('');

	app.user === undefined ? tweets = streams.home : tweets = streams.users[app.user];
	app.tweets = tweets.length;

	tweets = tweets.slice(-20);

	tweets.forEach(function(tweet){
		var item = "<li>";
		item += "<a href=#" + tweet.user + ">@" + tweet.user +"</a>: ";
		item += "<span>" + tweet.message + "</span> ";
		item += "<span class='date'> " + $.timeago(tweet.created_at) + "</span></li>";

		$body.prepend(item);
	});

	update();

};

var update = function(){
	var upd = $('#update');
	var tweets;
	app.user === undefined ? tweets = streams.home : tweets = streams.users[app.user];

	var newTweets = tweets.length - app.tweets;

	newTweets === 0 ? upd.slideUp() : upd.slideDown();
	var text = "<a href='#'>" + newTweets + ' new tweets.</a>';

	upd.html(text);
};

