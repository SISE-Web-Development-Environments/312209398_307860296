var context;
var heartContext;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var lastDirection;
var monsterImage;
var heartImage;
var bonusBugImage;
var monstersPosition = new Array();
var keyUp=38;
var keyDown=40;
var keyLeft=37;
var keyRight=39;
var gameTime=60;
var numOfBalls=50;
var point5Balls="#ffe0bd";
var point15Balls="#0000FF";
var point25Balls="#00FF00";
var numOfMonsters=1;
var monsterTurn;
var pacmanLives;
var bonusBugPosition=new Object();
var ateBonusBug;


function beginGame() {
	pacmanLives=5;
	heartContext=heartCanvas.getContext("2d");
	context = canvas.getContext("2d");
	$("audio")[0].play();
	Start();
}

function drawHearts() {
	heartContext.clearRect(0,0,400,80);
	for (let i = 0; i < pacmanLives; i++) {
		heartContext.drawImage(heartImage,i*80,20,60,60)
	}
}
function drawBonusBug() {
	if(bonusBugPosition.i<0)
		return;
	context.drawImage(bonusBugImage,bonusBugPosition.i*60+30,bonusBugPosition.j*60+30,60,60);
}

function drawRightPacman(center) {
	context.beginPath();
	context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
	context.lineTo(center.x, center.y);
	context.fillStyle = pac_color; //color
	context.fill();
	context.beginPath(); //pacman eye
	context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
	context.fillStyle = "black"; //color
	context.fill();
}

function drawLeftPacman(center) {
	context.beginPath();
	context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
	context.lineTo(center.x, center.y);
	context.fillStyle = pac_color; //color
	context.fill();
	context.beginPath(); //pacman eye
	context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
	context.fillStyle = "black"; //color
	context.fill();
}

function drawUpPacman(center) {
	context.beginPath();
	context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
	context.lineTo(center.x, center.y);
	context.fillStyle = pac_color; //color
	context.fill();
	context.beginPath(); //pacman eye
	context.arc(center.x - 5, center.y + 15, 5, 0, 2* Math.PI); // circle
	context.fillStyle = "black"; //color
	context.fill();

}

function drawDownPacman(center) {
	context.beginPath();
	context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
	context.lineTo(center.x, center.y);
	context.fillStyle = pac_color; //color
	context.fill();
	context.beginPath(); //pacman eye
	context.arc(center.x + 5, center.y - 15, 5, 0, 2* Math.PI); // circle
	context.fillStyle = "black"; //color
	context.fill();

}



function Start() {
	board = new Array();
	score = 0;
	monsterImage=new Image();
	monsterImage.src="blinky.png";
	heartImage=new Image();
	heartImage.src="heart.jpg";
	monsterImage.style.background= "transparent";
	bonusBugImage=new Image();
	bonusBugImage.src="bug.jpg"
	pac_color = "yellow";
	lastDirection="right";
	monsterTurn=false;
	ateBonusBug=false;
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	var monster_remain=numOfMonsters;
	var t;
	for (t = 0; t < numOfMonsters; t++) {
		monstersPosition[t]=(new Object())
	}
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				}
				else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	for (let i = 0; i <numOfMonsters ; i++) {
		var emptyCell = findRandomEmptySideCell(board);
		monstersPosition[i].i=emptyCell[0];
		monstersPosition[i].j=emptyCell[1];
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	var emptyCell=findRandomEmptySideCell(board);
	bonusBugPosition.i=emptyCell[0];
	bonusBugPosition.j=emptyCell[1];
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function findRandomEmptySideCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (true) {
		if(board[i][j] == 0&& (i==0||i==9||j==0||j==9))
			break;
		i = Math.floor(Math.random() * 9 );
		j = Math.floor(Math.random() * 9 );
	}
	return [i, j];
}

function makeRandMove(object) {
	var rand=Math.floor(Math.random() * 3 + 1);
	var counter=0;
	while (counter<10){
		counter++;
		if(rand==1){//right
			if(object.j+1<10&&board[object.i][object.j+1]!=4){
				object.j=object.j+1;
				return;
			}
		}
		if(rand==2){//left
			if(object.j-1>=0&&board[object.i][object.j-1]!=4){
				object.j=object.j-1;
				return;
			}
		}
		if(rand==3){//up
			if(object.i+1<10&&board[object.i+1][object.j]!=4){
				object.i=object.i+1;
				return;
			}
		}
		if(rand==3){//down
			if(object.i-1>=0&&board[object.i-1][object.j]!=4){
				object.i=object.i-1;
				return;
			}
		}
	}
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) { //pacman drawing
				if(lastDirection==="right")
					drawRightPacman(center);
				else if (lastDirection==="left")
					drawLeftPacman(center)
				else if(lastDirection==="up")
					drawUpPacman(center)
				else if (lastDirection==="down")
					drawDownPacman(center)
				else drawRightPacman(center)
			}
			else if (board[i][j] == 1) { // food circle drawing
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI);
				context.fillStyle = point5Balls; //color
				context.fill(); //food
				context.strokeStyle="black";
				context.stroke();
			} else if (board[i][j] == 4) { //wall drawing
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
	for (let k = 0; k < numOfMonsters; k++) {
		context.drawImage(monsterImage, monstersPosition[k].i*60+30, monstersPosition[k].j*60+30,35,45);
	}
	if(!ateBonusBug)
		drawBonusBug();
	drawHearts();
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
			lastDirection="up";
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			lastDirection="down";

		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			lastDirection="left";

		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			lastDirection="right";
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	if(monsterTurn){
		monsterTurn=false;
		for (var i=0;i<numOfMonsters;i++){
			monsterMove(monstersPosition[i]);
		}
	}else{
		monsterTurn=true;
	}
	makeRandMove(bonusBugPosition);
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	checkBugBonus();
	if (score >= 50) {
		window.clearInterval(interval);
		$("audio")[0].pause();
		setTimeout(function(){window.alert("Game completed");},250);
	}if(checkLoss()){
		pacmanLives--;
		score-=10;
		var audio = new Audio('buzzer.mp3');
		audio.play();
		if(pacmanLives==0){
			window.clearInterval(interval);
			$("audio")[0].pause();
			setTimeout(function (){window.alert("Game Loss");}, 250)
		}else {
			continueGame(board);
		}

	} else {
		Draw();
	}
}


function monsterMove(monsterPos) {

	if (monsterPos.i>0&&monsterPos.i > shape.i&& board[monsterPos.i - 1][monsterPos.j] != 4 && board[monsterPos.i - 1][monsterPos.j] != 3) {
			monsterPos.i--;
	}
	else if (monsterPos.j>0&&monsterPos.j > shape.j&& board[monsterPos.i][monsterPos.j - 1] != 4 && board[monsterPos.i][monsterPos.j - 1] != 3) {
			monsterPos.j--;
	}
	else if (monsterPos.i<9&&monsterPos.i < shape.i && board[monsterPos.i + 1][monsterPos.j] != 4 && board[monsterPos.i + 1][monsterPos.j] != 3) {
			monsterPos.i++;
	}
	else if (monsterPos.j<9&&monsterPos.j < shape.j&&monsterPos.j > 0 && board[monsterPos.i][monsterPos.j + 1] != 4 && board[monsterPos.i][monsterPos.j + 1] != 3) {
			monsterPos.j++;
	}else makeRandMove(monsterPos);
}

function checkLoss() {
	for (var i=0;i<numOfMonsters;i++){
		if(monstersPosition[i].i==shape.i&&monstersPosition[i].j==shape.j)
			return true;
	}
	return false;
}
function checkBugBonus() {
	if(bonusBugPosition.i==shape.i&&bonusBugPosition.j==shape.j){
		ateBonusBug=true;
		score+=50;
		bonusBugPosition.i=-10;
		bonusBugPosition.j=-10;
	}
}

function continueGame(board) {
	for (let i=0;i<numOfMonsters;i++){
		pos=findRandomEmptySideCell(board);
		monstersPosition[i].i=pos[0];
		monstersPosition[i].j=pos[1];
	}
}







