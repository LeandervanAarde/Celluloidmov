$(function(){
console.log("Jquery is linked and ready I-movie")
// Get info
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// Get the ID
const id = urlParams.get('id');
// Url and movie Id from arary
// Url for I-movie
const url = ' https://api.themoviedb.org/3/movie/'+id+'?api_key=fbdaccb39dfca477ec685d5da0f0e705&language=en-US';
// Url for similiar movies
const url2 = 'https://api.themoviedb.org/3/movie/'+id+'/similar?api_key=fbdaccb39dfca477ec685d5da0f0e705&language=en-US&page=1';
// Actor name url
const url3 = 'https://api.themoviedb.org/3/movie/'+id+'/credits?api_key=fbdaccb39dfca477ec685d5da0f0e705&language=en-US';
// trailer const
const url4 = 'https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=fbdaccb39dfca477ec685d5da0f0e705&language=en-US'


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
        var mov_language = result.original_language; 
        

        console.log(mov_Duration)

        console.log(mov_Year);



        $(".dscript").html(mov_Description);
        $(".movieCover").css("backgroundImage", "url("+mov_Image+")")
        $(".year p").html(mov_Year);
        $(".duration p").html(mov_runtime +" hours");
        $(".genre p").html(mov_Genre);
        $(".mov_Title strong").html(mov_Name);
        $(".rate").text(mov_Rating);
        $(".language").text(mov_language);


//    For small device

          $(".center").css("backgroundImage", "url("+mov_Image+")");
   


});

// For similiar movies
$.getJSON(url2, function(similiar){
    // Console.log the result to see the data
    console.log(similiar);
//    Variables for the data

    
for(var i= 0; i < 8; i++){
    var card= 
    "<div class='col-6 col-md-4 col-lg-3 card-container' style='border: none;'>\
    <a href='I-movie.html?id=" + similiar.results[i].id + "'> <div class='card' style='border: none;'>\
        <img src='https://image.tmdb.org/t/p/original"+similiar.results[i].poster_path+"'class='card-img-top img-fluid' alt=''>\
            <div class='card-body d-block '>\
                <p class='cardName'><strong>"+similiar.results[i].original_title+"</strong> <br>Rating: "+similiar.results[i].vote_average+" <br> Release date: "+similiar.results[i].release_date+"</p> \
                <a href='I-movie.html?id=" + similiar.results[i].id + "'><button type='button' class='btn btn-primary d-none d-lg-block '> Watch now</button> </a>\
            </div>\
         </div> </a>\
    </div>" ;

   
    // for header
$(".body").append( card);





}


});

$.getJSON(url3, function(actor){
    // Console.log the result to see the data
    console.log(actor);
//    Variables for the data
 var actorName = actor.cast[0].name;
 console.log(actorName)

 $('.Aname h1').text('Other movies with '+actorName);

 
    


});

// Trailer for movie 

$("#playtrailer").on('click', () =>{
    $.getJSON(url4, function(vid){
        // Console.log the result to see the data
        // console.log(vid);
    //    Variables for the data
     let array = vid.results; 
    
     for( i = 0; i < array.length; i++){
        if(array[i].name.includes("Trailer")){
            
            $('#video').html(`<iframe class="youtube" width="560" height="315" src="https://www.youtube.com/embed/${array[i].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> `);
            break;
        }
     } 
    
     
    
    
    });

});

var myModalEl = document.getElementById('modaltrailer')
myModalEl.addEventListener('hide.bs.modal', function (event) {
    $('#video').html("");

});



// $('.modal').show();


});

