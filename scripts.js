var gi = {};

gi.init = function() {
	gi.getRepos();
};	

gi.getRepos = function(){
  $.ajax('https://api.github.com/orgs/jquery/repos?callback=what',{
  		type : 'GET',
  		dataType : 'jsonp',
  		success: function(data){
  		  //Sort data by # of forks in descending order
  		  data.data.sort(function(a, b) {
    	  if (a.forks == b.forks) {
          	return a.forks == b.forks? 0 : +a.forks 
          	> +b.forks ? 1 : -1;
    	 	 };
    		return +a.forks < +b.forks ? 1 : -1;
		  });
	      //Loop through array for relevant data
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
  			//Call function appending data to HTML
  			gi.addHtml();
  		   };
  		}
  });
};

gi.addHtml = function(data){
	$(".repoCase").append("<div class='box'><h4>"+ "<a href=" 
		+ gi.repoLink + ">" + gi.repoNames +  "</a></h4><p>" 
		+ gi.repoDesc + "</p><p>Forked: " + gi.repoForks 
		+ " times</p><p>Open Issues: " + gi.repoIssues 
		+ "</p><p>Language: " + gi.repoLang + "</p><p>Watchers: " 
		+ gi.repoWatchers + "</p><p>Since " + gi.repoAge[0] 
		+ "</p></div>");
}

$(function(){
   gi.init();
});
