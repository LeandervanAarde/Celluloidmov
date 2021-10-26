$(document).ready(function(){
    console.log("JQuery is linked and ready");

    $(".dropdown").hide();

    $(".burger").click(function(){
        $(".dropdown").toggle(100);
    
    });

});