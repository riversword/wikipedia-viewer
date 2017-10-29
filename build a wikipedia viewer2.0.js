
$(document).ready(function(){
  var searchContent=$(".search input[name='searchBox']").val();

  //change the style of the button when click "Go"
  $("input[name='search']").mousedown(function(){
    $(this).removeClass('searchButton');
    $(this).addClass('buttonDown');
  });
  $("input[name='search']").mouseup(function(){
     $(this).removeClass('buttonDown');
     $(this).addClass('searchButton');
  });
  $("input[name='search']").mouseleave(function(){
     $(this).removeClass('buttonDown');
     $(this).addClass('searchButton');
  });


  $("input[name='searchBox']").bind('keypress',function(event){
    if(event.keyCode=='13'){
        $("input[name='search']").click(); //type "center"==click "Go"
    }
  });

	$("input[name='search']").click(function(){

	  $("div.logo").slideUp("slow");
    $(".logo img").slideUp("slow");
	  var getUrl='https://en.wikipedia.org/w/api.php?action=query&origin=*&generator=search&gsrsearch='+$(".search input[name='searchBox']").val() +'&format=json&gsrnamespace=0&prop=pageimages|extracts&exintro=true&pilimit=10&pithumbsize=100&exsentences=2'; 
  
    $.ajax({
  	   url:getUrl,
  	   type:"get",
  	   success:function(data){
  		            var pages=data.query.pages;
                  //clear the content
  		            $("#content").empty();
                  
  		            //get every  property of pages in data
  		            for(var i in pages){
                    if(pages[i].thumbnail!=null){
                      $('#content').append("<div class='resultItem'><h3><a href='http://en.wikipedia.org/wiki?curid="+pages[i].pageid+"' target='_blank'>"+pages[i].title+"</a></h3>"+"<img src='"+pages[i].thumbnail.source+ "'>"+pages[i].extract+"</div>");
                    }else $('#content').append("<div class='resultItem'><h3><a href='http://en.wikipedia.org/wiki?curid="+pages[i].pageid+"' target='_blank'>"+pages[i].title+"</a></h3>"+pages[i].extract+"</div>");
  		            }
     
  	   }
    });

	});
  $('input[name="random"]').click(function(){
    window.open('http://en.wikipedia.org/wiki/Special:Random');
  });
});
  