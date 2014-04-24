var gi = {};

gi.init = function() {
	console.log("yo yo");
	gi.getRepos();
	gi.getOrg();

};	

gi.getOrg = function(){
	console.log("yo");
	$.ajax('https://api.github.com/orgs/jquery',{
		type: 'GET',
		dataType: 'jsonp',
		success: function(data){
			alert("yo!");
			console.log(data);
		} //end success
	}); //end ajax
}; //end gi.getOrg

gi.getRepos = function(){
  $.ajax('https://api.github.com/orgs/jquery/repos?callback=what',{
  		type : 'GET',
  		dataType : 'jsonp',
  		success: function(data){
  			alert("yo");
  			console.log(data);
  		}//end success
  }); //end ajax call 


}; //gi.getRepos





$(function(){
   gi.init();

}); //doc ready 