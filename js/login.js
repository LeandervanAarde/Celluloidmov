$(function(){

    console.log("Login");

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

        url = "https://owmakerspace.co.za/users/data.json";

        $.getJSON(url, function(result){

            console.log(result.users);
          


            for(i = 0; i < result.users.length; i ++){

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

            }; // for loops ends here 



        }); // get JSON ends here

    }); //click for login ends here









    $(".login-btnSM").on("click", function(){

        var username = $(".usernameSM").val();
        var password = $(".passwordSM").val();

        url = "https://owmakerspace.co.za/users/data.json";

        $.getJSON(url, function(result){

            console.log(result.users);
          


            for(i = 0; i < result.users.length; i ++){

                if(result.users[i].username === username){

                    // console.log("Hello");

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

            }; // for loops ends here 



        }); // get JSON ends here

    });





    
    



    $(".sm").on("click",function(){

        var pass1 = $(".pass").val();
        var pass2 = $(".pass1").val();

        console.log(pass1);

        if(pass1 !== pass2){
            alert("Your Passwords Do not match!");
        }else{
            // window.location.href = "../celluloidmov/pages/home.html";
        }

    });

    $(".signup").on("click",function(event){

        event.preventDefault(); 
        var pass1 = $(".LG1").val();
        var pass2 = $(".LG2").val();
        var userName = $(".usernameSignUp").val();

        console.log(pass1);

        if(pass1 !== pass2){
            alert("Your Passwords Do not match!");
        }else{
            sessionStorage.setItem("Username SignUp", userName)
             window.location.href = "../celluloidmov/pages/home.html";
            
        }

    });



}); //Document.ready ends heere

