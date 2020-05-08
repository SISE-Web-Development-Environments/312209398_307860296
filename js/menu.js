var sessionStorage
var curDiv=document.getElementById('welcomeDiv');
var currUser;
var headCan ;
var ghost1Image;
var ghost2Image;
var ghost3Image;
var ghost4Image;
var pacmanImage;
var pacmanMirrorImage;
var ghostArr;
var intervalGhost;
var fistGhostPosition=-40;
var ghostEatPac;
var backImg;
var context5;
var context15;
var context25;
$(document).ready(function () {
    context5=color5canvas.getContext("2d");
    context15=color15canvas.getContext("2d");
    context25=color25canvas.getContext("2d");
    sessionStorage.setItem("p", "p");
    headCan= headCanvas.getContext("2d");
    ghost1Image=new Image();
    ghost2Image=new Image();
    ghost3Image=new Image();
    ghost4Image=new Image();
    pacmanImage=new Image();
    pacmanMirrorImage=new Image();
    backImg=new Image();
    backImg.src="https://www.toptal.com/designers/subtlepatterns/patterns/debut_light.png";
    ghost1Image.src="image/blinky.png";
    ghost2Image.src="image/pinky.png";
    ghost3Image.src="image/inky.png";
    ghost4Image.src="image/clyde.png";
    pacmanImage.src="image/pacman.png";
    pacmanMirrorImage.src="image/pacmanMirror.png";
    ghostArr=new Array();
    ghostEatPac=true;
/*    ghostPosition=new Array();
    for(let i=0;i<4;i++)
        for(let j=0;j<4;j++)
        ghostPosition[i]=[i,i];*/
    ghostArr[0]=ghost1Image;
    ghostArr[1]=ghost2Image;
    ghostArr[2]=ghost3Image;
    ghostArr[3]=ghost4Image;
    ghostArr[4]=pacmanImage;
    intervalGhost = setInterval(moveGhost, 200);
});
function moveGhost() {
    updateGhostPosition();
    drawMGhost();
}
function updateGhostPosition() {
    if (fistGhostPosition==800)
        ghostEatPac=false;
    if(fistGhostPosition==-200)
        ghostEatPac=true;
    if (ghostEatPac) {
        fistGhostPosition += 40;
        ghostArr[4]=pacmanImage;
    }
    else {
        fistGhostPosition -= 40;
        ghostArr[4]=pacmanMirrorImage;
    }
}
function drawMGhost() {
    let space = 40;
/*        headCan.beginPath()
        headCan.rect(0,0,800,25);
        headCan.fillStyle = "white"; //color
        headCan.fill();*/
        headCan.drawImage(backImg,0,0,800,25);
    for(let i=0;i<5;i++) {
        headCan.drawImage(ghostArr[i], i * 20 + space * i + fistGhostPosition, 5, 20, 20)

    }
}
function show(param_div_id) {
    curDiv.style.display = "none";
    curDiv=document.getElementById(param_div_id);
    curDiv.style.display = "block";
}

$( "#aRegister" ).click(function() {
    finishGame();
    $("#firstname").val('');
    $("#lastname").val('');
    $("#username").val('');
    $("#password").val('');
    $("#confirm_password").val('');
    $("#email").val('');
    $("#datepicker").val('');
    show('registerDiv');
});
$( "#signupBtn" ).click(function() {
    finishGame();
    $("#firstname").val('');
    $("#lastname").val('');
    $("#username").val('');
    $("#password").val('');
    $("#confirm_password").val('');
    $("#email").val('');
    $("#datepicker").val('');
});

$( "#aLogin" ).click(function() {
    $("#loginUsername").val('');
    $("#loginPassword").val('');
    show('loginDiv');
});
$( "#loginBtn" ).click(function() {
    $("#loginUsername").val('');
    $("#loginPassword").val('');
});
$( "#aWelcome" ).click(function() {
    finishGame();
    show('welcomeDiv');
});
$( "#aAbout" ).click(function() {
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
closeSpan.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/*$(document).ready(function() {
    sessionStorage.setItem("p", "p");
});*/
function checkIfUserExist()
{
    var username = $("#loginUsername"). val();
    var pass=$("#loginPassword"). val();
    var user = sessionStorage.getItem(username);
    if (user!=null && user==pass){
        alert("Login successfully");
        currUser=username;
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
$('#gameSettingform').submit(function initGame () {
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
    $("#lblUpkey_Output").val(keyUp);
    $("#lblDownkey_Output").val(keyDown);
    $("#lblLeftkey_Output").val(keyLeft);
    $("#lblRightkey_Output").val(keyRight);
    $("#lblnumOfMons_Output").val(numOfMonsters);
    $("#lblgameTime_Output").val(gameTime);
    $("#lblnumOfBalls_Output").val(numOfBalls);
    context5.beginPath();
    context5.rect(0,0,20,10);
    context5.fillStyle=point5Balls;
    context5.fill();
    context5.strokeStyle="black";
    context5.stroke();
    context15.beginPath();
    context15.rect(0,0,20,10);
    context15.fillStyle=point15Balls;
    context15.fill();
    context15.strokeStyle="black";
    context15.stroke();
    context25.beginPath();
    context25.rect(0,0,20,10);
    context25.fillStyle=point25Balls;
    context25.fill();
    context25.strokeStyle="black";
    context25.stroke();
    startGame();
    return false;
});

$('#loginBtn').click(function () {
    show('loginDiv');
})
$('#signupBtn').click(function () {
    show('registerDiv');
})
$('#btnSetSettings').click(function () {
    finishGame();
    show("settingsDiv");
})

