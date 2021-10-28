$(function(){
    $(".btn-click").on("click", function(){
        $(".panel").toggleClass("panel-slider");
        // $(".btn-click").html("Log In");
        $(this).html(($(this).html() == "Log In") ? 'Sign Up' : 'Log In');
    });

    $(".login-con").hide();
    
    $(".change-btn").on("click", function(){
        $(".signUp-con").slideToggle();
        $(".login-con").slideToggle();
    });

    $(".login-btn").on("click", function(){

        var username = $(".username").val();
        var password = $(".password").val();

        usersUrl = "https://owmakerspace.co.za/users/data.json";

        $.getJSON(usersUrl, function(result){
            for(i = 0; i < result.users.length; i ++){
                if(result.users[i].username === username) {
                    if(result.users[i].password === password) {

                        if(result.users[i].account === "active") {
                            window.location.href = "../celluloidmov/pages/home.html";
                            sessionStorage.setItem("username", username);
                        } else {
                            $(".message").css("background-color", "orange");
                            $(".message").text("Your account has been susspended");
                        }

                    } else {
                        $(".message").css("background-color", "tomato");
                        $(".message").text("Your email or password don't match");
                    }

                } else {
                    $(".message").css("background-color", "tomato");
                    $(".message").text("Your email or password don't match");
                }
            }; // for loops ends here 

        }); // get JSON ends here
    }); //click for login ends here
}); //Document.ready ends heere

