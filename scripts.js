var gi = {};
gi.markup = "<div class='box'><h4><a href='${link}'>${name}</a></h4><p>${description}</p><p>Forked: ${forks}  times</p><p>Open Issues: ${issues}</p><p>Language: ${language}</p><p>Watchers: ${watchers}</p><p>Since ${date}</p><a href='${website}'>${website}</a></div>";	

gi.init = function() {
	$.template( "reposTemplate", gi.markup);
	gi.getRepos();	
};	

gi.getRepos = function() {
	$.ajax("https://api.github.com/orgs/jquery/repos?callback=what", {
		type: 'GET',
		dataType: 'jsonp',
		success: function(data) {

  		    // Sort data by # of forks in descending order
  			data.data.sort(function(a, b) {		
  		  		if (a.forks == b.forks) {
  		  			return a.forks == b.forks? 0 : +a.forks 
  		  			> +b.forks ? 1 : -1;
  		  		};
  		  		return +a.forks < +b.forks ? 1 : -1;
  		  	});

	      // Loop through array for relevant data and add to array of object
	      	for (var i = 0; i < data.data.length; i++) {

	      	gi.repos= [ {
	      		name:  data.data[i].name,
	      		link: data.data[i].html_url,
	      		description: data.data[i].description,
	      		forks: data.data[i].forks,
	      		issues: data.data[i].open_issues,
	      		language: data.data[i].language,
	      		watchers: data.data[i].watchers,
	      		date: data.data[i].created_at.split('-')[0],
	      		website: data.data[i].homepage
	      	} ];

	      	// Append repos 
	      	$.tmpl( "reposTemplate", gi.repos ).appendTo( ".repoCase" )
  			};
  		}
  	});
};

$(function() {
	gi.init();
});
