$(document).ready(function(){
    console.log("JQuery is linked and ready");

    // Hover for Movie cards
    
    $(".card-body").hide();

    

    $(".card").hover(function(){
        $(".card-body").toggle();
    });



    $(".dropdown").hide();



    $(".burger").click(function(){
        $(".dropdown").toggle(100);
    
    });

  
        
   

  
    






});

