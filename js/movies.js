// Check the localstorage onload.
if(!localStorage.getItem("watchlater")){
    localStorage.setItem("watchlater", "");
}

$(document).ready(function(){

    const popularURL = "https://api.themoviedb.org/3/movie/popular?api_key=7c133cc72a2ad03fcf238f8ad51a53a3&language=en-US&page=3";
    const genreList = "https://api.themoviedb.org/3/genre/movie/list?api_key=7c133cc72a2ad03fcf238f8ad51a53a3&language=en-US";
    var card;

    /* Featured Movies Functionality */
    $.getJSON(popularURL, function(result) {
        for(var i = 0; i < 10; i++){
            card = 
                "\
                    <div class='col-6 col-md-4 col-lg-3 featured-card card-container' style='border: none;'>\
                        <a href='I-movie.html?id=" + result.results[i].id + "'>\
                        <div class='card no-hover' style='border: none;' data-id='" + result.results[i].id + "'>\
                            <img src='https://image.tmdb.org/t/p/original" + result.results[i].poster_path + "' class='card-img-top img-fluid' alt=''>\
                            <div class='card-body d-block '>\
                                <p class='cardName'><strong>" + result.results[i].original_title + "</strong> <br>Rating:" + result.results[i].vote_average + " <br> Release date:" + result.results[i].release_date + "</p> \
                                <a href='I-movie.html?id=" + result.results[i].id + "'><button type='button' class='btn btn-primary d-none d-lg-block watch'> Watch now</button> </a>\
                                <button type='button' class='btn btn-outline-secondary d-none d-lg-block watchlater'>Watch later</button>  \
                                <button type='button' class='btn btn-outline-secondary d-block d-lg-none  watchlater'style='width: 100% !important; >Watch later</button>\
                            </div>\
                        </div>\
                        </a>\
                    </div>\
                ";    

            // If already in localstorage append a card with disabled class that will state movie is already added
            if(localStorage.getItem('watchlater').includes(result.results[i].id)){
                card = 
                    "\
                        <div class='col-6 col-md-4 col-lg-3 featured-card card-container' style='border: none;'>\
                            <a href='I-movie.html?id=" + result.results[i].id + "'>\
                            <div class='card no-hover' style='border: none;' data-id='" + result.results[i].id+"'>\
                                <img src='https://image.tmdb.org/t/p/original" + result.results[i].poster_path + "'class='card-img-top img-fluid' alt=''>\
                                <div class='card-body d-block '>\
                                    <p class='cardName'><strong>" + result.results[i].original_title + "</strong> <br>Rating:" + result.results[i].vote_average + " <br> Release date:" + result.results[i].release_date + "</p> \
                                    <a href='I-movie.html?id=" + result.results[i].id + "'><button type='button' class='btn btn-primary d-none d-lg-block watch'> Watch now</button> </a>\
                                    <button disabled type='button' class='btn btn-outline-secondary d-none d-lg-block watchlater'>Added</button>  \
                                    <button disabled type='button' class='btn btn-outline-secondary d-block d-lg-none  watchlater'style='width: 100% !important; >Added</button>\
                                </div>\
                            </div>\
                            </a>\
                        </div>\
                    ";
            }

            $(".featured-items-container").append(card);

            // Function to add to local storage.
            $('.watchlater').click(function(event){
                let card = $(event.currentTarget).parent().parent()[0];
                let id= $(card).data("id"); 
                var temp = localStorage.getItem('watchlater');
                var watchlater ;
                
                if(temp == ""){
                     watchlater = []; 
                } else {
                    watchlater= temp.split(", ");
                }

                var doesNotExist = watchlater.every(item =>{
                    return item != id;
                });

                if(doesNotExist){
                    watchlater.push(id + ""); 
                    localStorage.setItem("watchlater", watchlater.join(", "));
                }

                $(event.currentTarget).attr("disabled", "true").html("Added");
            }); 
        }
    });
    /* End of Featured Movies Functioanality */

    /* Show All Movies Functionality */
    for(var i = 0; i < 500; i++){
        var moviesURL = "https://api.themoviedb.org/3/movie/" + i + "?api_key=7c133cc72a2ad03fcf238f8ad51a53a3&language=en-US";
        
        $.getJSON(moviesURL, function(result) {

            if(result.poster_path !== null && result.success !== false){
                for(var i= 0; i < 1; i++){
                    card = 
                        "\
                            <div class='col-6 col-md-4 col-lg-3 card-container' data-genre='" + result.genres[0].name + "' data-runtime=" + result.runtime + " data-rating=" + result.vote_average + " style='border: none;'>\
                                <a href='I-movie.html?id=" + result.id + "'>\
                                <div class='card' style='border: none;' data-id='"+result.id+"'>\
                                    <img src='https://image.tmdb.org/t/p/original"+result.poster_path+"'class='card-img-top img-fluid' alt=''>\
                                    <div class='card-body d-block '>\
                                        <p class='cardName'><strong>" + result.original_title + "</strong> <br>Rating:" + result.vote_average+" <br> Release date:" + result.release_date + "</p> \
                                        <a href='I-movie.html?id=" + result.id + "'><button type='button' class='btn btn-primary d-none d-lg-block watch'> Watch now</button> </a>\
                                        <button  type='button' class='btn btn-outline-secondary d-none d-lg-block watchlater'>Watch later</button>  \
                                        <button  type='button' class='btn btn-outline-secondary d-block d-lg-none  watchlater'style='width: 100% !important; >Watch later</button>\
                                    </div>\
                                </div>\
                                </a>\
                            </div>\
                        ";    
                }
            }
            
            // If already in localstorage append a card with disabled class that will state movie is already added
            if(localStorage.getItem('watchlater').includes(result.id)){
                card = 
                    "\
                        <div class='col-6 col-md-4 col-lg-3 card-container' data-genre='" + result.genres[0].name + "' data-runtime=" + result.runtime + " data-rating=" + result.vote_average + " style='border: none;'>\
                            <a href='I-movie.html?id=" + result.id + "'>\
                            <div class='card' style='border: none;' data-id ='" + result.id + "'>\
                                <img src='https://image.tmdb.org/t/p/original" + result.poster_path + "'class='card-img-top img-fluid' alt=''>\
                                <div class='card-body d-block '>\
                                    <p class='cardName'><strong>" + result.original_title + "</strong> <br>Rating:" + result.vote_average + " <br> Release date:" + result.release_date + "</p> \
                                    <a href='I-movie.html?id=" + result.id + "'><button type='button' class='btn btn-primary d-none d-lg-block watch'> Watch now</button> </a>\
                                    <button disabled type='button' class='btn btn-outline-secondary d-none d-lg-block watchlater'>Added</button>  \
                                    <button disabled type='button' class='btn btn-outline-secondary d-block d-lg-none  watchlater'style='width: 100% !important; >Added</button>\
                                </div>\
                            </div>\
                            </a>\
                        </div>\
                    ";
            }

            // Function to add to local storage.
            $('.watchlater').click(function(event){
                let card = $(event.currentTarget).parent().parent()[0];
                let id= $(card).data("id"); 
                var temp = localStorage.getItem('watchlater');
                var watchlater ;

                if(temp == "") {
                     watchlater = []; 
                } else {
                    watchlater= temp.split(", ");
                }

                var doesNotExist = watchlater.every(item =>{
                    return item != id;
                });

                if(doesNotExist){
                    watchlater.push(id + ""); 
                    localStorage.setItem("watchlater", watchlater.join(", "));
                }

                $(event.currentTarget).attr("disabled", "true").html("Added");
            }); 

            $(".body").append(card);
            $(".Movie-name").html(result.original_title);
            $(".description").html(result.overview);
            
            console.clear()
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

        $(".card-container").css("display", "none");

        if ($(".card-container").css("display") == "none") {
            $(".body h1").css("display", "none");
            $(".body").append(`<h1 class="text-center">Please Select a Different Genre</h1>`);
        } 

        if(genreType == "Genre"){
            $(".card-container").css("display", "block");
        } else {
            $(".featured-card").css("display", "block");
            $('[data-genre=' + genreType + ']').css("display", "block");
        }
    });
    /* End of Filter With Genre Functionality */

    /* Filter With Runtime Functionality  */
    $(".year_select").change(function(){
        $(".genre_select").val("Genre");
        $(".rating_select").val("Rating");
        $(".search-input").val(''); 

        var selectedTime = $('option:selected', this).attr("value");
        
        $(".card-container").css("display", "none");

        var i = +selectedTime;
        var selectedTimeEnd = i + 30;

        if(selectedTime !== "Runtime") {
            for(i; i <= selectedTimeEnd; i++){
                console.log(i)
                if(selectedTime == "Runtime") {
                    $(".card-container").css("display", "block");
                } else if($("[data-rating]") !== i) {
                    $(".featured-card").css("display", "block");
                    $("[data-runtime=\"" + i + "\"]").css("display", "block");
                    console.log("oops")
                }
            } 
        } else {
                $(".card-container").css("display", "block");
        }
    });
    /*  End of Filter With Runtime Functionality */ 

    /* Filter With Rating Functionality */
    $(".rating_select").change(function(){
        $(".genre_select").val("Genre");
        $(".year_select").val("Year");
        $(".search-input").val('');

        var selectedRating = $(this).val();

        $(".card-container").css("display", "none");

        for(var i = 1; i < 10; i++){
            var ratingSelect = selectedRating + "." + i;

            if(selectedRating == "Rating") {
                $(".card-container").css("display", "block");
            } else if($("[data-rating]") !== ratingSelect) {
                $(".featured-card").css("display", "block");
                $("[data-rating=\"" + ratingSelect + "\"]").css("display", "block");
            }
        }
    });
    /* End of Filter With Rating Functionality */

    /* Search Movies With Keywords Functionality */
    $(".search-input").keyup(function () { 
        $(".genre_select").val("Genre");
        $(".rating_select").val("Rating"); 

        var value = $(this).val().toLowerCase() 

        $(".card-container").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    /* End of Search Movies With Keywords Functionality */
});
