function remove(id){
    $('.remove').on('click', event =>{
        let card = $(event.currentTarget).parent().parent().parent();
        var watch = localStorage.getItem('watchlater').split(", ");
        var index = watch.indexOf(id);

        watch.splice(index, 1); 

        localStorage.setItem('watchlater', watch.join(", ")); 

        card.slideUp(700, ()=>{card.remove()});
    });
}

$(document).ready(function(){
        var watchlater = localStorage.getItem('watchlater').split(", ");

        for(var i= 0; i < watchlater.length; i++){
            // Get the id
            var watchUrl = 'https://api.themoviedb.org/3/movie/' + watchlater[i] + '?api_key=fbdaccb39dfca477ec685d5da0f0e705&language=en-US';
    
            $.getJSON(watchUrl, function(result) {
                var card = 
                        `
                            <div class='col-6 col-md-4 col-lg-3 card-container' style='border: none;'>
                                <a href='I-movie.html?id=` + result.id + `'>
                                    <div class='card' style='border: none;' data-id = '` + result.id + `'>
                                        <img src='https://image.tmdb.org/t/p/original` + result.poster_path + `'class='card-img-top img-fluid' alt=''>
                                        <div class='card-body d-block '>
                                            <p class='cardName'><strong>` + result.original_title + `</strong> <br>Rating: ` + result.vote_average + ` <br> Release date: ` + result.release_date + `</p> 
                                            <a href='I-movie.html?id=` + result.id + `'><button type='button' class='btn btn-primary d-none d-lg-block watch'> Watch now</button> </a>
                                            <button type='button' class='btn btn-outline-secondary d-none d-lg-block watchlater remove' onclick="remove(${result.id})">Remove</button>  
                                            <button type='button' class='btn btn-outline-secondary d-block d-lg-none watchlater remove' style='width: 100%; !important; margin-left: 0 !important; ' onclick="remove(${result.id})">Remove</button>  
                                        </div>
                                    </div> 
                                </a>
                            </div>
                        `;
    
                // for header
                $(".body").append( card);
            });
        } 

        //Clear all movies onclick 
        $('.clear').on("click", () =>{
            $(".card-container").remove();
            localStorage.clear();
        });
});
    