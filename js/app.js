$(document).ready(function(){

	showTweets();
	setInterval(update,3000);

//	Clicking on user profile, switches user.
	$('#tweets').on('click','a',function(e){
		e.preventDefault();	
		var user = $(this).attr("href");
		user = user.slice(1);
		app.user = user;
		user === app.defaultUser ? app.profileImage = app.defaultProfileImage :app.profileImage = 'img/blank.jpg';
		showTweets();
	});

//	Clicking on top 'Twittler' or 'Return Home' takes you back home and switches to default user.
	$('.home').on('click',function(e){
		e.preventDefault();
		app.user = app.defaultUser;
		app.profileImage = app.defaultProfileImage;
		showTweets();
	});

//	Clicking on 'x new tweets' bar, shows the new tweets
	$('#update').on('click','a',function(e){
		e.preventDefault();
		showTweets();
	});

//	Add Tweet Form, on enter - input the tweet into the stream and display it on page.
	$('#addTweet').keypress(function(e){
		if(e.which == 13){
			e.preventDefault();
			var tweet = {
				created_at: new Date(),
				message: $(this).val(),
				user: app.defaultUser
			};
			streams.home.push(tweet);	//Into main stream
			if(streams.users[app.defaultUser] === undefined) streams.users[app.defaultUser] = [];	//For new user
			streams.users[app.defaultUser].push(tweet);	//Into user stream
			$('#tweets').prepend(buildTweet(tweet));
			$(this).val(''); //Clear form
		}
	});


});

var app = {
	user: 'hamstar',
	defaultUser: 'hamstar',
	tweets: 0,
	viewLimit: 20,
	profileImage: 'img/hamster.jpg',
	defaultProfileImage: 'img/hamster.jpg'
};

var showTweets = function(){	//Finds the tweet stream and displays it in body
	var tweets, $body = $('#tweets');
	$body.html('');

	//Update the profile image and text
	$('.profile img').attr('src',app.profileImage);
	$('.profile a').text('@' + app.user);
	app.user === app.defaultUser ? $('#return').slideUp() : $('#return').slideDown();	//return home

	//Find the right stream based on app.user
	app.user === app.defaultUser ? tweets = streams.home : tweets = streams.users[app.user];
	app.tweets = tweets.length;

	//Limit the tweets to app.viewLimit
	tweets = tweets.slice(-app.viewLimit);

	//Build each tweet and prepend it to body
	tweets.forEach(function(tweet){
		$body.prepend(buildTweet(tweet));
	});

	update();	//Run the update to update the 'new tweets' bar
};

var buildTweet = function(tweet){	//Builds and returns a single tweet based on parameters
	var item = "<li>";
	item += "<a href=#" + tweet.user + ">@" + tweet.user +"</a>: ";
	item += "<span>" + tweet.message + "</span> ";
	item += "<abbr class='date timeago' title='"+ tweet.created_at.toISOString() +"'></abbr> " + "</span></li>";

	return item;
};

var update = function(){
	//Update the "new tweets" bar
	var upd = $('#update');
	var tweets;
	app.user === app.defaultUser ? tweets = streams.home : tweets = streams.users[app.user];
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

