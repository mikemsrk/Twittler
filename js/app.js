$(document).ready(function(){

	showTweets();
	setInterval(update,3000);

//	Clicking on user profile, switches user.
	$('#tweets').on('click','a',function(e){
		e.preventDefault();	
		var user = $(this).attr("href");
		user = user.slice(1);
		app.user = user;
		app.profileImage = 'img/blank.jpg';
	
		showTweets();
	});

//	Clicking on top 'Twittler' takes you back home and switches to default user.
	$('#home').on('click',function(e){
		e.preventDefault();
		app.user = 'hamstar';
		app.profileImage = 'img/hamster.jpg';
		showTweets();
	});

//	Clicking on 'x new tweets' bar, shows the new tweets
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

var showTweets = function(){	//Finds the tweet stream and displays it in body

	var tweets, $body = $('#tweets');
	$body.html('');

	//Update the profile image and text
	$('.profile img').attr('src',app.profileImage);
	$('.profile a').text('@' + app.user);

	//Find the right stream based on app.user
	app.user === 'hamstar' ? tweets = streams.home : tweets = streams.users[app.user];
	app.tweets = tweets.length;

	//Limit the tweets to app.viewLimit
	tweets = tweets.slice(-app.viewLimit);

	//Build each tweet and prepend it to body
	tweets.forEach(function(tweet){
		var item = "<li>";
		item += "<a href=#" + tweet.user + ">@" + tweet.user +"</a>: ";
		item += "<span>" + tweet.message + "</span> ";
		item += "<abbr class='date timeago' title='"+ tweet.created_at.toISOString() +"'></abbr> " + "</span></li>";

		$body.prepend(item);
	});

	update();	//Run the update to update the 'new tweets' bar

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

