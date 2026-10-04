function checkPassword(){

    const password = document.getElementById("password").value;

    const correctPassword = "feb9";

    if(password === correctPassword){

        window.location.href = "home.html";

    }

    else{

        document.getElementById("error").innerText =
        "Wrong password ❤️ Try again.";

    }

}

document.getElementById("password").addEventListener("keydown",function(e){

    if(e.key==="Enter"){

        checkPassword();

    }

});