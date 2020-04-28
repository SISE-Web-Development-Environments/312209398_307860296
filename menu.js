var sessionStorage
var curDiv=document.getElementById('welcomeDiv');
var currUser;


function show(param_div_id) {
    curDiv.style.display = "none";
    curDiv=document.getElementById(param_div_id);
    curDiv.style.display = "block";
}

$( ".register" ).click(function() {
    show('registerDiv');
});

$( ".login" ).click(function() {
    show('loginDiv');
});

$( "#about" ).click(function() {
    modal.style.display = "block";
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            modal.style.display = "none";
        }
    };
});
var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var closeSpan = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
/*closeSpan.onclick = function() {
    modal.style.display = "none";
}*/
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

$(document).ready(function() {
    sessionStorage.setItem("p", "p");
});
function checkIfUserExist()
{
    var username = $("#loginUsername"). val();
    var pass=$("#loginPassword"). val();
    var user = sessionStorage.getItem(username);
    if (user!=null && user==pass){
        alert("Login successfully");
        currUser=user;
        return true;
    }
    else
    {
        alert("user don't exist");
        return false;
    }
}
function addNewUser() {
    var username = $("#username"). val();
    var pass=$("#password"). val();
    sessionStorage.setItem(username, pass);
}

function startGame() {
    show('gameDiv');
    beginGame();
}

/*$('#loginForm').submit(function () {

    if( checkIfUserExist()) {
        show("settingsDiv");
    }
    return false;
});*/
/*$('#signupForm').submit(function () {
    addNewUser();
    alert( "New user added successfully!" );
});*/


function randomSett() {
    $("#keyup").val('');
    $("#keyup_Output").val(38);
    $("#keydown").val('');
    $("#keydown_Output").val(40);
    $("#keyleft").val('');
    $("#keyleft_Output").val(37);
    $("#keyright").val('');
    $("#keyright_Output").val(39);
    var rnd = Math.floor(Math.random() * 41);
    var randomBalls =rnd+50;
    $("#numberBalls").val(randomBalls);
    $("#numberBalls_Output").val(randomBalls);
    var rndColor5=getRandomColor()
    $("#5PointBalls").val(rndColor5);
    var rndColor15=getRandomColor()
    $("#15PointBalls").val(rndColor15);
    var rndColor25=getRandomColor()
    $("#25PointBalls").val(rndColor25);
    rnd = Math.floor(Math.random() * 241);
    var rndGameTime =rnd+60;
    $("#gameTime").val(rndGameTime);
    $("#gameTime_Output").val(rndGameTime);
    rnd = Math.floor(Math.random() *4);
    var rndMonsters =rnd+1;
    $("#numberMonters").val(rndMonsters);
    $("#numberMonters_Output").val(rndMonsters);


}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
$('#gameSettingform').submit(function () {
    keyUp=$("#keyup_Output").val();
    keyDown=$("#keydown_Output").val();
    keyLeft=$("#keyleft_Output").val();
    keyRight=$("#keyright_Output").val();
    numOfMonsters=$("#numberMonters_Output").val();
    point5Balls=$("#5PointBalls").val();
    point15Balls=$("#15PointBalls").val();
    point25Balls=$("#25PointBalls").val();
    gameTime=$("#gameTime_Output").val();
    numOfBalls=$("#numberBalls_Output").val();

    show('gameDiv');
    startGame();
    return false;
});
/*
$('#signupForm').submit(function () {
    show('loginDiv');
    return false;
});
*/
$('#loginBtn').click(function () {
    show('loginDiv');
})
$('#signupBtn').click(function () {
    show('registerDiv');
})