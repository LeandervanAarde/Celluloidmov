$(document).ready(function(){
console.log("Homepage JQuery is active")
    $(".card").mouseenter(function(){
        $(".card-body").removeClass("d-none");
        $(".card-body").addClass("d-block");
    });

    $(".card").mouseleave(function(){
        $(".card-body").removeClass("d-block");
        $(".card-body").addClass("d-none");
    });

    console.log("Homepage JQuery is active");

    const popularurl= "https://api.themoviedb.org/3/movie/popular?api_key=fbdaccb39dfca477ec685d5da0f0e705&language=en-US&page=1";

    $.getJSON(popularurl, function(result) {
        console.log(result); 

        for(var i= 0; i < 8; i++){
            var card= 
            "<div class='col-6 col-md-4 col-lg-3 card-container' style='border: none;'>\
                <div class='card' style='border: none;'>\
                <img src='https://image.tmdb.org/t/p/original"+result.results[i].poster_path+"'class='card-img-top img-fluid' alt=''>\
                    <div class='card-body d-block '>\
                        <p class='cardName'><strong>"+result.results[i].original_title+"</strong> <br>Rating: "+result.results[i].vote_average+" <br> Release date: "+result.results[i].release_date+"</p> \
                        <button type='button' class='btn btn-primary d-none d-lg-block '> Watch now</button>\
                    </div>\
                 </div>\
            </div>" ;
            // for header

        $(".body").append( card);

        $(".Movie-name").html(result.results[0].original_title);

        $(".mainM").html("<img src='https://image.tmdb.org/t/p/original"+result.results[0].poster_path+"'class='card-img-top img-fluid' alt=''>");

        $(".description").html(result.results[0].overview);

        }

    });
})