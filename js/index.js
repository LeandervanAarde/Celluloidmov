$(document).ready(function(){
    $(".dropdown").hide();

    $(".burger").click(function(){
        $(".dropdown").toggle(100);
    });

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