$(document).ready(function(){
    /* Gets Users Name when they log In */
    var username = sessionStorage.getItem("username")

    $(".username").text(username);

    // Open social icons
    $(".icon-1").on("click", function(){
        window.open("https://twitter.com/");
    }); 

    $(".icon-2").on("click", function(){
        window.open("https://youtube.com/");
    }); 

    $(".icon-3").on("click", function(){
        window.open("https://www.facebook.com/");
    }); 
    // end of social icons 
});