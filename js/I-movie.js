$(function(){
console.log("Jquery is linked and ready I-movie")
// Get info
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// Get the ID
const id = urlParams.get('id');
// Url and movie Id from arary
const url = ' https://api.themoviedb.org/3/movie/'+id+'?api_key=fbdaccb39dfca477ec685d5da0f0e705&language=en-US';

$.getJSON(url, function(result){
    // Console.log the result to see the data
    console.log(result);
//    Variables for the data

   var mov_Description = result.overview; 
   var mov_Image = 'https://image.tmdb.org/t/p/original'+result.poster_path;
   var mov_Year = result.release_date.split("-", +1 ).join(' ');
   var mov_Duration = result.runtime/60;
   var mov_Genre = result.genres[0].name;
   var mov_runtime = mov_Duration.toPrecision(2);
   var mov_Name = result.original_title; 
   var mov_Rating = result.vote_average; 
   

   console.log(mov_Duration)

   console.log(mov_Year);



   $(".dscript").html(mov_Description);
   $(".movieCover").css("backgroundImage", "url("+mov_Image+")")
   $(".year p").html(mov_Year);
   $(".duration p").html(mov_runtime +" hours");
   $(".genre p").html(mov_Genre);
   $(".mov_Title strong").html(mov_Name);
   $(".rate").text(mov_Rating);

//    For small device

    $(".center").css("backgroundImage", "url("+mov_Image+")");
   


});

});