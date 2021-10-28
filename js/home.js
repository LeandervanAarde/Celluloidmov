
var counter = 1;
var names = [];
var images = [];
var description = [];
var backdrop = [];
var movId = [];

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function changeImage() {

    $(".Movie-name").fadeOut(300);
    $(".mainM").fadeOut(300);
    $(".description").fadeOut(300);
    $(".header-image").css("backgroundImage", "url(" + backdrop[counter] + ")");
    $(".header-image .btn").fadeOut(300);

    await sleep(300);

    if (localStorage.getItem('watchlater').includes(movId[counter])) {
        $(".header-image .watchlater-header").attr("disabled", "true");
        $(".header-image .watchlater-header").html("Added");
    } else {
        $(".header-image .watchlater-header").removeAttr("disabled");
        $(".header-image .watchlater-header").html("Watch later");
    }

    $(".Movie-name").html(names[counter]);

    $(".mainM").html("<img id='mainCover' src='" + images[counter] + "' class='card-img-top img-fluid' alt=''>");

    $(".description").html(description[counter]);
    $(".header-image").attr("data-id", movId[counter]);

    $(".Movie-name").fadeIn(300);
    $(".mainM").fadeIn(300);
    $(".description").fadeIn(300);
    $(".header-image .btn").fadeIn(300);

    counter++;

    if (counter >= 3) {
        counter = 0;
    }
};

// Check the localstorage onload.
if (!localStorage.getItem("watchlater")) {
    localStorage.setItem("watchlater", "");
}

$(document).ready(function () {
    // Welcome message if the user does exist in the session storage
    $('.welcome').html("Welcome, " + sessionStorage.getItem("username"));

    const popularurl = "https://api.themoviedb.org/3/movie/popular?api_key=fbdaccb39dfca477ec685d5da0f0e705&language=en-US&page=1";

    $.getJSON(popularurl, function (result) {
        for (var i = 0; i < 8; i++) {
            var card =
                "\
                        <div class='col-6 col-md-4 col-lg-3 card-container' style='border: none;'>\
                            <a href='I-movie.html?id=" + result.results[i].id + "'>\
                            <div class='card' style='border: none;' data-id='" + result.results[i].id + "'>\
                                <img src='https://image.tmdb.org/t/p/original" + result.results[i].poster_path + "' class='card-img-top img-fluid' alt=''>\
                                <div class='card-body d-block '>\
                                    <p class='cardName'><strong>" + result.results[i].original_title + "</strong> <br>Rating: " + result.results[i].vote_average + " <br> Release date: " + result.results[i].release_date + "</p> \
                                    <a href='I-movie.html?id=" + result.results[i].id + "'><button type='button' class='btn btn-primary d-none d-lg-block watch'> Watch now</button> </a>\
                                    <button type='button' class='btn btn-outline-secondary d-none d-lg-block watchlater'>Watch later</button>  \
                                    <button type='button' class='btn btn-outline-secondary d-block d-lg-none watchlater' style='width: 100% !important;'>Watch later</button>\
                                </div>\
                            </div>\
                            </a>\
                        </div>\
                    ";

            // If already in localstorage append a card with disabled class that will state movie is already added
            if (localStorage.getItem('watchlater').includes(result.results[i].id)) {
                card =
                    "\
                        <div class='col-6 col-md-4 col-lg-3 card-container' style='border: none;'>\
                            <a href='I-movie.html?id=" + result.results[i].id + "'>\
                            <div class='card' style='border: none;' data-id='" + result.results[i].id + "'>\
                                <img src='https://image.tmdb.org/t/p/original" + result.results[i].poster_path + "' class='card-img-top img-fluid' alt=''>\
                                <div class='card-body d-block '>\
                                    <p class='cardName'><strong>" + result.results[i].original_title + "</strong> <br>Rating: " + result.results[i].vote_average + " <br> Release date: " + result.results[i].release_date + "</p> \
                                    <a href='I-movie.html?id=" + result.results[i].id + "'><button type='button' class='btn btn-primary d-none d-lg-block watch'> Watch now</button> </a>\
                                    <button disabled type='button' class='btn btn-outline-secondary d-none d-lg-block watchlater'>Added</button>  \
                                    <button disabled type='button' class='btn btn-outline-secondary d-block d-lg-none  watchlater'style='width: 100% !important; >Added</button>\
                                </div>\
                            </div>\
                            </a>\
                        </div>\
                    ";
            }

            // for header
            $(".body").append(card);
            if (i < 3) {
                names.push(result.results[i].original_title);
                images.push('https://image.tmdb.org/t/p/original' + result.results[i].poster_path);
                description.push(result.results[i].overview);
                backdrop.push('https://image.tmdb.org/t/p/original' + result.results[i].backdrop_path)
                movId.push(result.results[i].id);
            }  //If statement ends
        }  //For loop ends 

        // Function to add to local storage.
        $('.watchlater, .watchlater-header').click(function (event) {
            let card = $(event.currentTarget).parent().parent()[0];
            let id = $(card).data("id");
            var temp = localStorage.getItem('watchlater');
            var watchlater;

            if (temp == "") {
                watchlater = [];
            } else {
                watchlater = temp.split(", ");
            }

            var doesNotExist = watchlater.every(item => {
                return item != id;
            });

            if (doesNotExist) {
                watchlater.push(id + "");
                localStorage.setItem("watchlater", watchlater.join(", "));
            }

            $(event.currentTarget).attr("disabled", "true").html("Added");
        });

        $(".header-watch").on("click", () => {
            var dataId = $(".header-image").data("id");
            window.location.href = "I-movie.html?id=" + dataId;
        });

        // For image change
        changeImage();

        var car = setInterval("changeImage()", 4000);
    }); //get JSON ends here

    /* Gets Users Images and Updates them on Pages */
    usersUrl = "https://owmakerspace.co.za/users/usersImages";
    var username = sessionStorage.getItem("username");

    $.getJSON(usersUrl, function (result) {
        for (i = 0; i < result.users.length; i++) {
            if (result.users[i].username === username) {
                // thePhoto = result.users[i].usersImages;
                $(".photo").css("background-image", "url(" + result.users[i].usersImages + ")");
            }
        }; // for loops ends here 
    });
    /* End of Gets Users Images and Updates them on Pages */

    $(".logout-btn").on("click", function () {
        sessionStorage.clear();
    });
});  //Document on load ends
