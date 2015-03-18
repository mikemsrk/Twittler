$(document).ready(function(){

	showTweets();
	setInterval(showTweets,3000);

});

var app = {
	user: undefined
};

var showTweets = function(){

	var tweets, $body = $('#tweets');
	$body.html('');

	app.user === undefined ? tweets = streams.home : tweets = streams.user;

	tweets = tweets.slice(-20);

	tweets.forEach(function(tweet){
		var $tweet = $('<div></div>');
		$tweet.text('@' + tweet.user + ': ' + tweet.message);
		$tweet.prependTo($body);
	});

};

