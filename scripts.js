var gi = {};

gi.init = function() {
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
  				gi.repoLink = data.data[i].html_url;
  				gi.repoDesc = data.data[i].description;
  				gi.repoForks = data.data[i].forks;
  				gi.repoIssues = data.data[i].open_issues;
  				gi.repoLang = data.data[i].language;
  				gi.repoWatchers = data.data[i].watchers;
  				gi.repoAge = data.data[i].created_at.split('-');
  				gi.repoWebsite = data.data[i].homepage;

  				$(".repoCase").append("<div class='box'><h4>"+ "<a href=" + gi.repoLink + ">" + gi.repoNames +  "</a></h4><p>" + gi.repoDesc + "</p><p>Forked: " + gi.repoForks + " times</p><p>Open Issues: " + gi.repoIssues + "</p><p>Language: " + gi.repoLang + "</p><p>Watchers: " + gi.repoWatchers + "</p><p>Since " + gi.repoAge[0] + "</p></div>")  ;

  				

  	




 
  			};
  			
  		}//end success
  }); //end ajax call 
}; //gi.getRepos





$(function(){
   gi.init();

}); //doc ready 