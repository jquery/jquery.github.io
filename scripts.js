var gi = {};

gi.init = function() {
	console.log("yo yo");
	gi.getOrg();
	gi.getRepos();
	

};	

gi.getOrg = function(){
	console.log("yo");
	$.ajax('https://api.github.com/orgs/jquery',{
		type: 'GET',
		dataType: 'jsonp',
		success: function(data){
			gi.since = data.data.created_at;
			gi.since = gi.since.split('-');
			gi.since = $('<h3 class="since">').text("On GitHub Since " + gi.since[0]);
			gi.followers = $('<h3>').text("followers " + data.data.followers);
			gi.publicRepos = $('<h3>').text("Repos: " + data.data.public_repos);
			gi.lastAction = $('<h3>').text("Last Active: " +data.data.updated_at);
			$('header').append(gi.since, gi.publicRepos, gi.followers, gi.lastAction)


		} //end success
	}); //end ajax
}; //end gi.getOrg

gi.getRepos = function(){
  $.ajax('https://api.github.com/orgs/jquery/repos?callback=what',{
  		type : 'GET',
  		dataType : 'jsonp',
  		success: function(data){
  		  console.log(data);
  		  for (var i = 0; i < data.data.length; i++) {
  				gi.repoNames = data.data[i].name;
  				$(".repoCase").append("<h4>"+ gi.repoNames + "</h4>", 
  					);


  				
  			};
  			
  		}//end success
  }); //end ajax call 
}; //gi.getRepos





$(function(){
   gi.init();

}); //doc ready 