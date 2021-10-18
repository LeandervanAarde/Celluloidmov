$(document).ready(function(){
    console.log("JQuery is linked and ready");

       // Hover for Movie cards
    
       $(".card").mouseenter(function(){
        $(".card-body").removeClass("d-lg-none");
        $(".card-body").addClass("d-lg-block");
    });

    $(".card").mouseleave(function(){
        $(".card-body").removeClass("d-lg-block");
        $(".card-body").addClass("d-lg-none");
    });

    $(".dropdown").hide();



    $(".burger").click(function(){
        $(".dropdown").toggle(100);
    });


    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');


    // const popularurl= 'https://api.themoviedb.org/3/movie/popular?api_key=' + id;
    const popularurl= "https://api.themoviedb.org/3/movie/popular?api_key=fbdaccb39dfca477ec685d5da0f0e705&language=en-US&page=1";
    $.getJSON(popularurl, function(result) {
        console.log(result); 

 


        for(var i= 0; i < result.results.length; i++){
            var card= 
            "<div class='col-6 col-md-4 col-lg-3 card-container' style='border: none;'>\
            <div class='card' style='border: none;'>\
                <img src='https://image.tmdb.org/t/p/original"+result.results[i].poster_path+"' alt='>\
                <div class='card-body d-block d-lg-none'>\
                    <p class='cardName'><strong>"+result.results[i].original_title+"</strong> <br>Rating: "+result.results[i].vote_average+" <br> 1h 38m</p>\
                    <button type='button' class='btn btn-primary d-none d-lg-block '> Watch now</button>\
                </div>\
            </div>\
            </div>";

            $(".body").append(card);
            // if(i === sessionStorage.getItem("i")){
            //     $(".body").append(card);
            // }

            
        }  //For loop ends 

    });

});
    