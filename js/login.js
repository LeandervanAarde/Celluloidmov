$(function(){

    console.log("Login");

<<<<<<< Updated upstream
=======
    $(".btn-click").on("click", function(){
        $(".panel").toggleClass("panel-slider");
        // $(".btn-click").html("Log In");
        $(this).html(($(this).html() == "Log In") ? 'Sign Up' : 'Log In');
    });

    // $(".btnFlip").click(function(){
    //     $(".flipper").addClass("flip");
    //     console.log("Flip");
    //   });


    $(".signup").on("click", function(){
        var pass1 = $(".pass").val();
        var pass2 = $(".pass2").val();
    
        console.log(check);

        if(pass1 != pass2){
            alert("Your passwords do not match!")
        }else{
            // window.location.href = "../celluloidmov/pages/home.html";
            // $("#signedUp").attr("href", "../Celluloidmov/pages/home.html");
        }

    });



    $(".login-con").hide();
    
    $(".change-btn").on("click", function(){
        $(".signUp-con").slideToggle();
        $(".login-con").slideToggle();
    });

>>>>>>> Stashed changes
    $(".login-btn").on("click", function(){

        var username = $(".username").val();
        var password = $(".password").val();

        url = "https://owmakerspace.co.za/users/data.json";

        $.getJSON(url, function(result){

            console.log(result.users);


            for(i = 0; i < result.users.length; i ++){

                console.log(result.users);

                if(result.users[i].username === username){

                    console.log("Hello");

                    if(result.users[i].password === password){

                        if(result.users[i].account === "active"){
                            window.location.href = "../celluloidmov/pages/home.html";
                            sessionStorage.setItem("username", username);
                        }else{
                            $(".message").css("background-color", "orange");
                            $(".message").text("Your account has been susspended");
                        }

                    }else{
                        $(".message").css("background-color", "tomato");
                        $(".message").text("Your email or password don't match");
                    }

                }else{
                    $(".message").css("background-color", "tomato");
                    $(".message").text("Your email or password don't match");
                }

            };

<<<<<<< Updated upstream


        });

    });

=======
}); //Document.ready ends heere
>>>>>>> Stashed changes

});