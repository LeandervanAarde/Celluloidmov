$(document).ready(function(){
    console.log("JQuery is linked and ready");

    // Hover for Movie cards
    
    $(".card").mouseenter(function(){
        $(".card-body").removeClass("d-none");
        $(".card-body").addClass("d-block");
    });

    $(".card").mouseleave(function(){
        $(".card-body").removeClass("d-block");
        $(".card-body").addClass("d-none");
    });
});