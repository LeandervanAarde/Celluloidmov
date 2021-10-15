$(function(){
console.log("Jquery is linked and ready I-movie")

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const url = ' https://api.themoviedb.org/3/movie/'+id+'?api_key=fbdaccb39dfca477ec685d5da0f0e705&language=en-US';

$.getJSON(url, function(result){
    console.log(result);

});

})