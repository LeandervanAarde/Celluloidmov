$(document).ready(function(){
    console.log("Homepage JQuery is active");
    
    const popularURL = "https://api.themoviedb.org/3/movie/popular?api_key=7c133cc72a2ad03fcf238f8ad51a53a3&language=en-US&page=3";
    var screenWidth,
        screenHeight,
        card;

    $.getJSON(popularURL, function(result) {
        console.log(result)
        for(var i = 0; i < 11; i++){
            if(i < 5){
                card = 
                    `
                        <div class="featured-card featured-card-1">
                            <div class="box">
                                <img src="https://image.tmdb.org/t/p/original${result.results[i].poster_path}" class="model">
                            </div>
                        </div>        
                    `;

                    $(".featured-items-container").append(card);
            } else if(i > 5){
                card = 
                    `
                        <div class="featured-card featured-card-2 d-none">
                            <div class="box">
                                <img src="https://image.tmdb.org/t/p/original${result.results[i].poster_path}" class="model">
                            </div>
                        </div>        
                    `;

                    $(".featured-items-container").append(card);
            }
        }
    });

    $(".featured-right-arrow").click(function(){
                $(".featured-card-1").fadeOut(500);
                $(".featured-right-arrow").fadeOut(500);
                $(".featured-card-2").fadeIn(500);
                $(".featured-left-arrow").fadeIn(500);
                $(".featured-card").css("display", "flex")
                $(".featured-card-1").addClass("d-none");
                $(".featured-card-2").removeClass("d-none");
                $(".featured-left-arrow").removeClass("d-none");
                $(".featured-right-arrow").addClass("d-none");
    });

    $(".featured-left-arrow").click(function(){
                $(".featured-card-2").fadeOut(500);
                $(".featured-left-arrow").fadeOut(500);
                $(".featured-card-1").fadeIn(500);
                $(".featured-right-arrow").fadeIn(500);
                $(".featured-card").css("display", "flex")
                $(".featured-card-2").addClass("d-none");
                $(".featured-card-1").removeClass("d-none");
                $(".featured-right-arrow").removeClass("d-none");
                $(".featured-left-arrow").addClass("d-none");
    });

    for(var i = 0; i < 500; i++){
        var moviesURL = "https://api.themoviedb.org/3/movie/"+i+"?api_key=7c133cc72a2ad03fcf238f8ad51a53a3&language=en-US";

        $.getJSON(moviesURL, function(result) {
            console.log(result); 

            if(result.poster_path !== null && result.success !== false){
                for(var i= 0; i < 1; i++){
                    card= 
                    `<div class='col-6 col-md-4 col-lg-3 card-container' style='border: none;'>
                        <div class='card' style='border: none;'>
                        <img src='https://image.tmdb.org/t/p/original${result.poster_path}'class='card-img-top img-fluid' alt=''>
                            <div class='card-body d-block '>
                                <p class='cardName'><strong>${result.original_title}</strong> <br>Rating: ${result.vote_average} <br> Release date: ${result.release_date}</p> 
                                <button type='button' class='btn btn-primary d-none d-lg-block '> Watch now</button>
                            </div>
                         </div>
                    </div>`;
                }
            }
                    
                $(".body").append(card);
        
                $(".Movie-name").html(result.original_title);
        
                $(".description").html(result.overview);
        });
    }

});