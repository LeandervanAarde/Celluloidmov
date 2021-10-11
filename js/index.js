$(document).ready(function(){
    console.log("JQuery is linked and ready");

    // Hover for Movie cards
    
    $(".card").mouseenter(function(){
        $(".card-body").removeClass("d-lg-none");
        $(".card-body").addClass("d-lg-block");
    });

    $(".card").mouseleave(function(){
        $(".card-body").removeClass("d-lg-block");
        $(".card-body").addClass("d-lg-none");
    });

    $(".dropdown").hide();



    $(".burger").click(function(){
        $(".dropdown").toggle(100);
    
    });
        
   

  
    






});

