// Check the localstorage onload.
if(!localStorage.getItem("watchlater")) {
	localStorage.setItem("watchlater", "");
}

$(function() {
	// Get info
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	// Get the ID
	const id = urlParams.get('id');
	const individualMovieUrl = ' https://api.themoviedb.org/3/movie/' + id + '?api_key=fbdaccb39dfca477ec685d5da0f0e705&language=en-US';
	const similarMovieUrl = 'https://api.themoviedb.org/3/movie/' + id + '/similar?api_key=fbdaccb39dfca477ec685d5da0f0e705&language=en-US&page=1';
	const recommendedMovieUrl = 'https://api.themoviedb.org/3/movie/' + id + '/recommendations?api_key=fbdaccb39dfca477ec685d5da0f0e705&language=en-US&page=1';
	const trailerUrl = 'https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=fbdaccb39dfca477ec685d5da0f0e705&language=en-US';

	$(".info").attr("data-id", id);
	$.getJSON(individualMovieUrl, function(result) {
		// Variables for the data
		var mov_Description = result.overview;
		var mov_Image = 'https://image.tmdb.org/t/p/original' + result.poster_path;
		var mov_Year = result.release_date.split("-", +1).join(' ');
		var mov_Duration = result.runtime / 60;
		var mov_Genre = result.genres[0].name;
		var mov_runtime = mov_Duration.toPrecision(2);
		var mov_Name = result.original_title;
		var mov_Rating = result.vote_average;
		var mov_language = result.original_language;

		$(".dscript").html(mov_Description);
		$(".movieCover").css("backgroundImage", "url(" + mov_Image + ")")
		$(".year p").html(mov_Year);
		$(".duration p").html(mov_runtime + " hours");
		$(".genre p").html(mov_Genre);
		$(".mov_Title strong").html(mov_Name);
		$(".rate").text(mov_Rating);
		$(".lang h3 , .langsm").text(mov_language);
		$(".langmd h3").text(mov_language);

		// For small device
		$(".center").css("backgroundImage", "url(" + mov_Image + ")");
	});

	// For similiar movies
	$.getJSON(similarMovieUrl, function(similiar) {
		for(var i = 0; i < 20; i++) {
			var card = 
					"\
						<div class='col-6 col-md-4 col-lg-3 card-container' style='border: none;'>\
        					<a href='I-movie.html?id=" + similiar.results[i].id + "'>\
								<div class='card' style='border: none;' data-id='" + similiar.results[i].id + "'>\
            						<img src='https://image.tmdb.org/t/p/original" + similiar.results[i].poster_path + "' class='card-img-top img-fluid' alt=''>\
            						<div class='card-body d-block '>\
            							<p class='cardName'><strong>" + similiar.results[i].original_title + "</strong> <br>Rating: " + similiar.results[i].vote_average + " <br> Release date: " + similiar.results[i].release_date + "</p> \
            							<a href='I-movie.html?id=" + similiar.results[i].id + "'><button type='button' class='btn btn-primary d-none d-lg-block watch'> Watch now</button> </a>\
            							<button type='button' class='btn btn-outline-secondary d-none d-lg-block watchlater'>Watch later</button>  \
            							<button type='button' class='btn btn-outline-secondary   d-block d-lg-none watchlater' style='width: 100% !important; margin-right: 100px !important'>Watch later</button>\
            						</div>\
            					</div>\
							</a>\
        				</div>\
					";

           // If already in localstorage append a card with disabled class that will state movie is already added
			if(localStorage.getItem('watchlater').includes(similiar.results[i].id)) {
				card =
					"\
						<div class='col-6 col-md-4 col-lg-3 card-container' style='border: none;'>\
            				<a href='I-movie.html?id=" + similiar.results[i].id + "'>\
								<div class='card' style='border: none;' data-id='" + similiar.results[i].id + "'>\
                					<img src='https://image.tmdb.org/t/p/original" + similiar.results[i].poster_path + "' class='card-img-top img-fluid' alt=''>\
                    				<div class='card-body d-block '>\
                        				<p class='cardName'><strong>" + similiar.results[i].original_title + "</strong> <br>Rating: " + similiar.results[i].vote_average + " <br> Release date: " + similiar.results[i].release_date + "</p> \
                        				<a href='I-movie.html?id=" + similiar.results[i].id + "'><button type='button' class='btn btn-primary d-none d-lg-block watch'> Watch now</button> </a>\
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
		} //For loop ends 

		$('.watchlater').click(function(event) {
			let card = $(event.currentTarget).parent().parent()[0];
			let id = $(card).data("id");
			var temp = localStorage.getItem('watchlater');
			var watchlater;
			if(temp == "") {
				watchlater = [];
			} else {
				watchlater = temp.split(", ");
			}

			var doesNotExist = watchlater.every(item => {
				return item != id;
			});

			if(doesNotExist) {
				watchlater.push(id + "");
				localStorage.setItem("watchlater", watchlater.join(", "));
			}
			
			$(event.currentTarget).attr("disabled", "true").html("Added");
		});

		$('.watchlaterIsm').click(function(event) {
			let card = $(event.currentTarget).parent()[0];
			let id = $(card).data("id");
			console.log(id)
			var temp = localStorage.getItem('watchlater');
			var watchlater;
			if(temp == "") {
				watchlater = [];
			} else {
				watchlater = temp.split(", ");
			}

			var doesNotExist = watchlater.every(item => {
				return item != id;
			});

			if(doesNotExist) {
				watchlater.push(id + "");
				localStorage.setItem("watchlater", watchlater.join(", "));
			}
			
			$(event.currentTarget).attr("disabled", "true").html("Added");
		});
	});

	// Recommended movies 
	$.getJSON(recommendedMovieUrl, function(Recommended) {
		for(var i = 0; i < 4; i++) {
			var card = 
					"\
					<div class='col-6 col-md-4 col-lg-3 card-container' style='border: none;'>\
        				<a href='I-movie.html?id=" + Recommended.results[i].id + "'>\
							<div class='card' style='border: none;' data-id='" + Recommended.results[i].id + "'>\
            					<img src='https://image.tmdb.org/t/p/original" + Recommended.results[i].poster_path + "'class='card-img-top img-fluid' alt=''>\
            					<div class='card-body d-block '>\
            						<p class='cardName'><strong>" + Recommended.results[i].original_title + "</strong> <br>Rating: " + Recommended.results[i].vote_average + " <br> Release date: " + Recommended.results[i].release_date + "</p> \
            						<a href='I-movie.html?id=" + Recommended.results[i].id + "'><button type='button' class='btn btn-primary d-none d-lg-block watch'> Watch now</button> </a>\
            						<button type='button' class='btn btn-outline-secondary d-none d-lg-block watchlater'>Watch later</button>  \
            						<button type='button' class='btn btn-outline-secondary   d-block d-lg-none watchlater' style='width: 100% !important; margin-right: 100px !important'>Watch later</button>\
            					</div>\
            				</div>\
						</a>\
        			</div>\
					";

           // If already in localstorage append a card with disabled class that will state movie is already added
			if(localStorage.getItem('watchlater').includes(Recommended.results[i].id)) {
				card = 
					"\
						<div class='col-6 col-md-4 col-lg-3 card-container' style='border: none;'>\
            				<a href='I-movie.html?id=" + Recommended.results[i].id + "'>\
								<div class='card' style='border: none;' data-id='" + Recommended.results[i].id + "'>\
                					<img src='https://image.tmdb.org/t/p/original" + Recommended.results[i].poster_path + "'class='card-img-top img-fluid' alt=''>\
                					<div class='card-body d-block '>\
                						<p class='cardName'><strong>" + Recommended.results[i].original_title + "</strong> <br>Rating: " + Recommended.results[i].vote_average + " <br> Release date: " + Recommended.results[i].release_date + "</p> \
                						<a href='I-movie.html?id=" + Recommended.results[i].id + "'><button type='button' class='btn btn-primary d-none d-lg-block watch'> Watch now</button> </a>\
                						<button disabled type='button' class='btn btn-outline-secondary d-none d-lg-block watchlater'>Added</button>  \
                						<button disabled type='button' class='btn btn-outline-secondary d-block d-lg-none  watchlater'style='width: 100% !important; >Added</button>\
                					</div>\
                				</div>\
							</a>\
            			</div>\
					";
			}
			// for header
			$(".body-2").append(card);
		} //For loop ends 

		$('.watchlater').click(function(event) {
			let card = $(event.currentTarget).parent().parent()[0];
			let id = $(card).data("id");
			var temp = localStorage.getItem('watchlater');
			var watchlater;

			if(temp == "") {
				watchlater = [];
			} else {
				watchlater = temp.split(", ");
			}
			
			var doesNotExist = watchlater.every(item => {
				return item != id;
			});

			if(doesNotExist) {
				watchlater.push(id + "");
				localStorage.setItem("watchlater", watchlater.join(", "));
			}

			$(event.currentTarget).attr("disabled", "true").html("Added");
		});
	});

	// Trailer for movie 
	$(".playtrailer").on('click', () => {
		$.getJSON(trailerUrl, function(vid) {
			// Variables for the data
			let array = vid.results;
			for(i = 0; i < array.length; i++) {
				if(array[i].name.includes("Trailer")) {
					$('#video').html(`<iframe class="youtube" width="560" height="315" src="https://www.youtube.com/embed/${array[i].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> `);
					break;
				}
			}
		});
	});

	var myModalEl = document.getElementById('modaltrailer')
	myModalEl.addEventListener('hide.bs.modal', function(event) {
		$('#video').html("");
	});


	$(".logout-btn").on("click", function () {
        sessionStorage.clear();
    });
	
});