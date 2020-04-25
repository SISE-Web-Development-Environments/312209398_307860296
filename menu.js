var sessionStorage
var curDiv=document.getElementById('welcomeDiv');
var currUser;
var keySet=null;
var colour;
var userMonstersNum;
var userMaxTime;

function show(param_div_id) {
    curDiv.style.display = "none";
    curDiv=document.getElementById(param_div_id);
    document.getElementById(param_div_id).style.display = "block";
}

$( ".register" ).click(function() {
    show('registerDiv')
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
    }
    else alert("user don't exist");
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

$('#loginForm').submit(function () {
    checkIfUserExist()
    if(currUser)
        startGame();
    return false;
});

$('#submitSettimgs').click(function () {

});

function keySetSelect(sel) {
    keySet=sel.options[sel.selectedIndex].value;
}
function pacColourSelect(sel) {
    colour=sel.options[sel.selectedIndex].value;
}
function maxTimeSelect(inp){
    userMaxTime=inp.value;
}
function monsterAmountSelect(inp){
    userMonstersNum=inp.value;
}

$("#randomSettings").click(function() {
    var random=Math.floor(Math.random() * 3);
    if(random==0){
        keySet='letters';
        $("#letters").selected(true);
    }
    if(random==1){
        keySet='arrows';
        $("#arrows").selected(true);
    }
    if(random==2){
        keySet='nums';
        $("#nums").selected(true);
    }
    console.log(keySet);
});



