$(document).ready(function(){
console.log("Homepage JQuery is active")
    $(".card").mouseenter(function(){
        $(".card-body").removeClass("d-none");
        $(".card-body").addClass("d-block");
    });

    $(".card").mouseleave(function(){
        $(".card-body").removeClass("d-block");
        $(".card-body").addClass("d-none");
    });
})