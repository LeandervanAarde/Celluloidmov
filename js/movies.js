$(document).ready(function(){
    console.log("Homepage JQuery is active");
    
    const popularURL = "https://api.themoviedb.org/3/movie/popular?api_key=7c133cc72a2ad03fcf238f8ad51a53a3&language=en-US&page=3";
    const genreList = "https://api.themoviedb.org/3/genre/movie/list?api_key=7c133cc72a2ad03fcf238f8ad51a53a3&language=en-US";
    var card;
        
    /* Featured Movies Functionality */
    $.getJSON(popularURL, function(result) {
        for(var i = 0; i < 11; i++){
            if(i < 5){
                card = 
                    `
                        <div class="featured-card featured-card-1">
                            <div class="box">
                                <img class="featured-img" src="https://image.tmdb.org/t/p/original${result.results[i].poster_path}" class="model">
                            </div>
                        </div>        
                    `;

                    $(".featured-items-container").append(card);
            } else if(i > 5){
                card = 
                    `
                        <div class="featured-card featured-card-2 d-none">
                            <div class="box">
                                <img class="featured-img" src="https://image.tmdb.org/t/p/original${result.results[i].poster_path}" class="model">
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
    /* End of Featured Movies Functioanality */

    /* Show All Movies Functionality */
    for(var i = 0; i < 500; i++){
        var moviesURL = "https://api.themoviedb.org/3/movie/"+i+"?api_key=7c133cc72a2ad03fcf238f8ad51a53a3&language=en-US";
        
        $.getJSON(moviesURL, function(result) {
            console.log(result)
            if(result.poster_path !== null && result.success !== false){
                for(var i= 0; i < 1; i++){
                    var releaseDate = result.release_date.substr(0, 4)

                    card= 
                    `<div class='col-6 col-md-4 col-lg-3 card-container ${result.genres[0].name} ${releaseDate} ${result.vote_average}' style='border: none;'>
                        <div class='card' style='border: none;'>
                        <img src='https://image.tmdb.org/t/p/original${result.poster_path}'class='card-img-top img-fluid' alt=''>
                            <div class='card-body d-block '>
                                <p class='cardName'><strong>${result.original_title}</strong> <br>Rating: ${result.vote_average} <br> Release date: ${result.release_date}</p> 
                                <button type='button' class='btn btn-primary d-none d-lg-block '> Watch now</button>
                            </div>
                         </div>
                    </div>`;

                    card = 
                    `
                    <div class='col-6 col-md-4 col-lg-3 card-container ${result.genres[0].name} ${releaseDate} ${result.vote_average}' style='border: none;'>
                    <a href='I-movie.html?id=" + ${result.id} + "'> <div class='card' style='border: none;'>
                        <img src='https://image.tmdb.org/t/p/original${result.poster_path}'class='card-img-top img-fluid' alt=''>
                            <div class='card-body d-block '>
                                <p class='cardName'><strong>${result.original_title}</strong> <br>Rating: ${result.vote_average} <br> Release date: ${result.release_date}</p> 
                                <a href='I-movie.html?id=" + ${result.id}'><button type='button' class='btn btn-primary d-none d-lg-block watch'> Watch now</button> </a>
                                <a href='../pages/watchlist.html?id="${result.id}+"'><button type='button' class='btn btn-outline-secondary d-none d-lg-block watchlater'>Watch later</button> </a> 
                            </div>
                         </div> </a>
                    </div> 
                    `
                }
                
            }
                $(".body").append(card);
                $(".Movie-name").html(result.original_title);
                $(".description").html(result.overview);
        });
    }
    /* End of Show All Movies Functionality */

    /* Filter With Genre Functionality */
    $.getJSON(genreList, function(result) {
        for (var i = 0; i < result.genres.length; i++) {
            var list = `<option>${result.genres[i].name}</option>`;
            $(".genre_select").append(list);
        }
    });

    $(".genre_select").change(function(){
        $(".rating_select").val("Rating");
        $(".year_select").val("Year");
        $(".search-input").val('');
        
        var genreType = $(this).val();
        console.log(genreType)

        $(".card-container").css("display", "none");

        if(genreType == "Genre"){
            $(".card-container").css("display", "block");
        } else {
            $("." + genreType).css("display", "block");
        } 

        if($(".card-container").hasClass(genreType)) {
            
        } else {
            $(".body").append(`<h1 class="text-center">Please Select a Different Genre</h1>`);
        }
    });
    /* End of Filter With Genre Functionality */

    /* Filter With Year Functionality 
    $(".year_select").change(function(){
        $(".genre_select").val("Genre");
        $(".rating_select").val("Rating"); 

        var year = $(this).val();
        console.log(year)

        $(".card-container").css("display", "none");

        if(year == "Year") {
            $(".card-container").css("display", "block");
        } else {
            $("." + year).css("display", "block")
        }
    });
     End of Filter With Year Functionality */

    /* Filter With Year Functionality */
    $(".rating_select").change(function(){
        $(".genre_select").val("Genre");
        $(".year_select").val("Year");
        $(".search-input").val('');

        var rating = $(this).val();
        console.log(rating)

        $(".card-container").css("display", "none");

        if(rating == "Rating"){
            $(".card-container").css("display", "block");
        } else if(rating == 0) {
            $(".0.0" ).css("display", "block");
            $(".0.1" ).css("display", "block");
            $(".0.2" ).css("display", "block");
            $(".0.3" ).css("display", "block");
            $(".0.4" ).css("display", "block");
            $(".0.5" ).css("display", "block");
            $(".0.6" ).css("display", "block");
            $(".0.7" ).css("display", "block");
            $(".0.8" ).css("display", "block");
            $(".0.9" ).css("display", "block");
        } else if(rating == 1) {
            $(".1.0" ).css("display", "block");
            $(".1.1" ).css("display", "block");
            $(".1.2" ).css("display", "block");
            $(".1.3" ).css("display", "block");
            $(".1.4" ).css("display", "block");
            $(".1.5" ).css("display", "block");
            $(".1.6" ).css("display", "block");
            $(".1.7" ).css("display", "block");
            $(".1.8" ).css("display", "block");
            $(".1.9" ).css("display", "block");
        } else if(rating == 2) {
            $(".2.0" ).css("display", "block");
            $(".2.1" ).css("display", "block");
            $(".2.2" ).css("display", "block");
            $(".2.3" ).css("display", "block");
            $(".2.4" ).css("display", "block");
            $(".2.5" ).css("display", "block");
            $(".2.6" ).css("display", "block");
            $(".2.7" ).css("display", "block");
            $(".2.8" ).css("display", "block");
            $(".2.9" ).css("display", "block");
        } else if(rating == 3) {
            $(".3.0" ).css("display", "block");
            $(".3.1" ).css("display", "block");
            $(".3.2" ).css("display", "block");
            $(".3.3" ).css("display", "block");
            $(".3.4" ).css("display", "block");
            $(".3.5" ).css("display", "block");
            $(".3.6" ).css("display", "block");
            $(".3.7" ).css("display", "block");
            $(".3.8" ).css("display", "block");
            $(".3.9" ).css("display", "block");
        } else if(rating == 4) {
            $(".4.0" ).css("display", "block");
            $(".4.1" ).css("display", "block");
            $(".4.2" ).css("display", "block");
            $(".4.3" ).css("display", "block");
            $(".4.4" ).css("display", "block");
            $(".4.5" ).css("display", "block");
            $(".4.6" ).css("display", "block");
            $(".4.7" ).css("display", "block");
            $(".4.8" ).css("display", "block");
            $(".4.9" ).css("display", "block");
        } else if(rating == 5) {
            $(".5.0" ).css("display", "block");
            $(".5.1" ).css("display", "block");
            $(".5.2" ).css("display", "block");
            $(".5.3" ).css("display", "block");
            $(".5.4" ).css("display", "block");
            $(".5.5" ).css("display", "block");
            $(".5.6" ).css("display", "block");
            $(".5.7" ).css("display", "block");
            $(".5.8" ).css("display", "block");
            $(".5.9" ).css("display", "block");
        } else if(rating == 6) {
            $(".6.0" ).css("display", "block");
            $(".6.1" ).css("display", "block");
            $(".6.2" ).css("display", "block");
            $(".6.3" ).css("display", "block");
            $(".6.4" ).css("display", "block");
            $(".6.5" ).css("display", "block");
            $(".6.6" ).css("display", "block");
            $(".6.7" ).css("display", "block");
            $(".6.8" ).css("display", "block");
            $(".6.9" ).css("display", "block");
        } else if(rating == 7) {
            $(".7.0" ).css("display", "block");
            $(".7.1" ).css("display", "block");
            $(".7.2" ).css("display", "block");
            $(".7.3" ).css("display", "block");
            $(".7.4" ).css("display", "block");
            $(".7.5" ).css("display", "block");
            $(".7.6" ).css("display", "block");
            $(".7.7" ).css("display", "block");
            $(".7.8" ).css("display", "block");
            $(".7.9" ).css("display", "block");
        } else if(rating == 8) {
            $(".8,0" ).css("display", "block");
            $(".8,1" ).css("display", "block");
            $(".8,2" ).css("display", "block");
            $(".8,3" ).css("display", "block");
            $(".8,4" ).css("display", "block");
            $(".8,5" ).css("display", "block");
            $(".8,6" ).css("display", "block");
            $(".8,7" ).css("display", "block");
            $(".8,8" ).css("display", "block");
            $(".8,9" ).css("display", "block");
        } else if(rating == 9) {
            $(".9,0" ).css("display", "block");
            $(".9,1" ).css("display", "block");
            $(".9,2" ).css("display", "block");
            $(".9,3" ).css("display", "block");
            $(".9,4" ).css("display", "block");
            $(".9,5" ).css("display", "block");
            $(".9,6" ).css("display", "block");
            $(".9,7" ).css("display", "block");
            $(".9,8" ).css("display", "block");
            $(".9,9" ).css("display", "block");
        } else if(rating == 10) {
            $(".10" ).css("display", "block");
        } 

        if($(".card-container").hasClass(rating)) {
            
        } else {
            $(".body h1").css("display", "none");
            $(".body").append(`<h1 class="text-center">Please Select a Different Raitng</h1>`);
        }
    });
    /* End of Filter With Year Functionality */

    /* Search Movies With Keywords Functionality */
    $(".search-input").keyup(function () { //when the user releases the key
        $(".genre_select").val("Genre");
        $(".rating_select").val("Rating"); 
        var value = $(this).val().toLowerCase() //user input stored as a variable
        $(".card-container").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    }); //keyword search function end
    /* End of Search Movies With Keywords Functionality */
});
