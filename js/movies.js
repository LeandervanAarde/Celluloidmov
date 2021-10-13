$(document).ready(function(){
    console.log("Homepage JQuery is active");
    
    const popularURL = "https://api.themoviedb.org/3/movie/popular?api_key=7c133cc72a2ad03fcf238f8ad51a53a3&language=en-US&page=3";

    $.getJSON(popularURL, function(result) {
        console.log(result); 

            for(var i= 0; i < 11; i++){

                if( i < 5 ){
                    $("#section1").append(
                        `
                        <div class="item">
                            <a href="#">
                                <img
                                    src="https://image.tmdb.org/t/p/original${result.results[i].poster_path}"
                                    alt="Movie Image">
                            </a>
                        </div>   
                        `
                    )
                } else if( i > 5){
                    $("#section2").append(
                        `
                        <div class="item">
                            <a href="#">
                                <img
                                    src="https://image.tmdb.org/t/p/original${result.results[i].poster_path}"
                                    alt="Movie Image">
                            </a>
                        </div>   
                        `
                    )
                }
            }
    });

    for(var i = 0; i < 500; i++){
        var moviesURL = "https://api.themoviedb.org/3/movie/"+i+"?api_key=7c133cc72a2ad03fcf238f8ad51a53a3&language=en-US";

        $.getJSON(moviesURL, function(result) {
            console.log(result); 

            if(result.poster_path !== null){
                for(var i= 0; i < 1; i++){
                    var card= 
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
        
                $(".mainM").html("<img src='https://image.tmdb.org/t/p/original"+result.poster_path+"'class='card-img-top img-fluid' alt=''>");
        
                $(".description").html(result.overview);
        });
    }
});