
var counter = 1;
var names = [];
var images = [];
var description = [];
var backdrop = [];

function sleep(time){
    return new Promise(resolve => setTimeout(resolve, time));
}

 async function changeImage(){

    $(".Movie-name").fadeOut(300);
    $(".mainM").fadeOut(300);
    $(".description").fadeOut(300);
    $(".header-image").css("backgroundImage","url("+backdrop[counter]+")");
    $(".header-image .btn").fadeOut(300);
    await sleep(300); 


    $(".Movie-name").html(names[counter]);

    $(".mainM").html("<img id='mainCover' src=' "+images[counter]+"'class='card-img-top img-fluid' alt=''>");

    $(".description").html(description[counter]);



    $(".Movie-name").fadeIn(300);
    $(".mainM").fadeIn(300);
    $(".description").fadeIn(300);
    $(".header-image .btn").fadeIn(300);


    counter ++;

    if (counter >= 3){
        counter = 0; 
    }
};



$(document).ready(function(){
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

            if(i < 3){
                names.push(result.results[i].original_title);
                images.push('https://image.tmdb.org/t/p/original'+result.results[i].poster_path);
                description.push(result.results[i].overview);  
                backdrop.push('https://image.tmdb.org/t/p/original'+result.results[i].backdrop_path)          
            }  //If statement ends
            
        }  //For loop ends 
        changeImage();

        var car = setInterval("changeImage()", 3000);



    }); //get JSON ends here
});  //Document on load ends
