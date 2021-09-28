$(document).ready(function(){
    console.log("JQuery is linked and ready");

    $(".btn-click").on("click", function(){
        $(".panel").toggleClass("panel-slider");
        // $(".btn-click").html("Log In");
        $(this).html(($(this).html() == "Log In") ? 'Sign Up' : 'Log In');
    });

    
});