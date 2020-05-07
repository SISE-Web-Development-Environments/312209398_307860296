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
var monster1Image;
var monster2Image;
var monster3Image;
var monster4Image;
var gameOverImg;
var winnerImg;
var heartImage;
var bonusBugImage;
var candyHeartImage
var monstersPosition = new Array();
var keyUp=38;
var keyDown=40;
var keyLeft=37;
var keyRight=39;
var gameTime=10;
var numOfBalls=50;
var point5Balls="#cc3300";
var point15Balls="#0000FF";
var point25Balls="#00FF00";
var numOfMonsters=1;
var monsterTurn;
var pacmanLives;
var bonusBugPosition=new Object();
var heartCandyPosition=new Object();
var numOfBallsOnBoard;
var totalFood;
var emptyCell;

function beginNewGame() {
	finishGame();
	beginGame();
}

function finishGame(){
	setTimeout(function (){window.clearInterval(interval);}, 100);
	$("audio")[0].pause();
}

function beginGame() {
	pacmanLives=5;
	heartContext=heartCanvas.getContext("2d");
	context = canvas.getContext("2d");
	$("audio")[0].play();
	Start();
}

function drawHearts() {
	heartContext.clearRect(0,0,250,80);
	for (let i = 0; i < pacmanLives; i++) {
		heartContext.drawImage(heartImage,i*50,20,60,60)
	}
}
function drawBonusBug() {
	if(bonusBugPosition.i<0)
		return;
	context.drawImage(bonusBugImage,bonusBugPosition.i*60,bonusBugPosition.j*60,60,60);
}
function drawCandyHeart() {
	if(heartCandyPosition.i<0)
		return;
	context.drawImage(candyHeartImage,heartCandyPosition.i*60,heartCandyPosition.j*60,60,60);
}

function drawRightPacman(center) {
	context.beginPath();
	context.arc(center.i* 60 + 30, center.j* 60 + 30, 25, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
	context.lineTo(center.i*60+30, center.j*60+30);
	context.fillStyle = pac_color; //color
	context.fill();
	context.strokeStyle="black";
	context.stroke();
	context.beginPath(); //pacman eye
	context.arc(center.i* 60 + 30 + 5, center.j* 60 + 30 - 15, 3, 0, 2 * Math.PI); // circle
	context.fillStyle = "black"; //color
	context.fill();
}

function drawLeftPacman(center) {
	context.beginPath();
	context.arc(center.i* 60 + 30, center.j* 60 + 30, 25, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
	context.lineTo(center.i*60+30, center.j*60+30);
	context.fillStyle = pac_color; //color
	context.fill();
	context.strokeStyle="black";
	context.stroke();
	context.beginPath(); //pacman eye
	context.arc(center.i* 60 + 30 + 5, center.j* 60 + 30 - 15, 3, 0, 2 * Math.PI); // circle
	context.fillStyle = "black"; //color
	context.fill();
}

function drawUpPacman(center) {
	context.beginPath();
	context.arc(center.i* 60 + 30, center.j* 60 + 30, 25, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
	context.lineTo(center.i*60+30, center.j*60+30);
	context.fillStyle = pac_color; //color
	context.fill();
	context.strokeStyle="black";
	context.stroke();
	context.beginPath(); //pacman eye
	context.arc(center.i* 60 + 30 - 15, center.j* 60 + 30 +5, 3, 0, 2* Math.PI); // circle
	context.fillStyle = "black"; //color
	context.fill();

}

function drawDownPacman(center) {
	context.beginPath();
	context.arc(center.i* 60 + 30, center.j* 60 + 30, 25, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
	context.lineTo(center.i*60+30, center.j*60+30);
	context.fillStyle = pac_color; //color
	context.fill();
	context.strokeStyle="black";
	context.stroke();
	context.beginPath(); //pacman eye
	context.arc(center.i* 60 + 30 + 5, center.j* 60 + 30 - 15, 3, 0, 2* Math.PI); // circle
	context.fillStyle = "black"; //color
	context.fill();

}

function init() {
	board = new Array();
	score = 0;
	monster1Image=new Image();
	monster2Image=new Image();
	monster3Image=new Image();
	monster4Image=new Image();
	gameOverImg=new Image();
	winnerImg=new Image();
	heartImage=new Image();
	bonusBugImage=new Image();
	candyHeartImage=new Image();
	gameOverImg.src="image/gameover2.png";
	winnerImg.src="image/winner3.png";
	monster1Image.src="image/blinky.png";
	monster2Image.src="image/pinky.png";
	monster3Image.src="image/inky.png";
	monster4Image.src="image/clyde.png";
	heartImage.src="image/redheart.png";
	bonusBugImage.src="image/bee.png";
	candyHeartImage.src="image/candy.png";
	pac_color = "yellow";
	lastDirection="right";
	monsterTurn=false;
	totalFood = numOfBalls;
	numOfBallsOnBoard=numOfBalls;
}

function Start() {
	init();
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		for (var j = 0; j < 15; j++) {
			board[i][j]=0;
		}
	}
	createObstacles();
	emptyCell=findRandomEmptyCell(board);
	shape.i=emptyCell[0];
	shape.j=emptyCell[1];
	for (let i = 0; i < numOfMonsters; i++) {
		monstersPosition[i]=(new Object())
	}
	for (let i = 0; i <numOfMonsters ; i++) {
		emptyCell = findRandomEmptySideCell(board);
		monstersPosition[i].i=emptyCell[0];
		monstersPosition[i].j=emptyCell[1];
	}
	for (let i=0;i<totalFood*0.6;i++){
		emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 5;
	}
	for (let i=0;i<totalFood*0.3;i++){
		emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 15;
	}
	for (let i=0;i<totalFood*0.1;i++){
		emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 25;
	}
	emptyCell=findRandomEmptySideCell(board);
	bonusBugPosition.i=emptyCell[0];
	bonusBugPosition.j=emptyCell[1];
	emptyCell=findRandomEmptySideCell(board);
	heartCandyPosition.i=emptyCell[0];
	heartCandyPosition.j=emptyCell[1];
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
	var i = Math.floor(Math.random() * 9 +0.7);
	var j = Math.floor(Math.random() * 9+0.7 );
	var counter=0;
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 +0.7);
		j = Math.floor(Math.random() * 9 +0.7);
		if(counter==50){
			return findManualy(board);
		}
		counter++;
	}
	return [i, j];
}

function findManualy(board) {
	for (let i = 0; i <10 ; i++) {
		for (let j = 0; j <10 ; j++) {
			if(board[i][j]==0)
				return [i,j];
		}
	}
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
	if (keysDown[keyUp]) {//up
		return 1;
	}
	if (keysDown[keyDown]) {//down
		return 2;
	}
	if (keysDown[keyLeft]) {//left
		return 3;
	}
	if (keysDown[keyRight]) {//right
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
			center.x = i * 60 + 0;
			center.y = j * 60 + 0;
			if (board[i][j] == 5) { // food circle drawing 5 points
				context.beginPath();
				context.arc(center.x+30, center.y+30, 10, 0, 2 * Math.PI);
				context.fillStyle = point5Balls; //color
				context.fill(); //food
				context.strokeStyle="black";
				context.stroke();
			}else if (board[i][j] == 15) { // food circle drawing 15 points
				context.beginPath();
				context.arc(center.x+30, center.y+30, 10, 0, 2 * Math.PI);
				context.fillStyle = point15Balls; //color
				context.fill(); //food
				context.strokeStyle="black";
				context.stroke();
			}else if (board[i][j] == 25) { // food circle drawing 25 points
				context.beginPath();
				context.arc(center.x+30, center.y+30, 10, 0, 2 * Math.PI);
				context.fillStyle = point25Balls; //color
				context.fill(); //food
				context.strokeStyle="black";
				context.stroke();
			}
			else if (board[i][j] == 4) { //wall drawing
				context.beginPath();
				context.rect(center.x, center.y, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
				context.strokeStyle="black";
				context.stroke();
			}
		}
	}
	for (let k = 0; k < numOfMonsters; k++) {
		let monsterImage;
		if (k==0)
			monsterImage=monster1Image;
		else if (k==1)
			monsterImage=monster2Image;
		else if (k==2)
			monsterImage=monster3Image;
		else if (k==3)
			monsterImage=monster4Image;
		context.drawImage(monsterImage, monstersPosition[k].i*60+15, monstersPosition[k].j*60+15,30,30);
	}
	if(bonusBugPosition.i>0)
		drawBonusBug();
	if(bonusBugPosition.i>0)
		drawCandyHeart();
	if(lastDirection==="right")
		drawRightPacman(shape);
	else if (lastDirection==="left")
		drawLeftPacman(shape)
	else if(lastDirection==="up")
		drawUpPacman(shape)
	else if (lastDirection==="down")
		drawDownPacman(shape)
	else
		drawRightPacman(shape);
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
	if (board[shape.i][shape.j] == 5) {
		numOfBallsOnBoard--;
		score+=5;
	}
	if (board[shape.i][shape.j] == 15) {
		numOfBallsOnBoard--;
		score+=15;
	}
	if (board[shape.i][shape.j] == 25) {
		numOfBallsOnBoard--;
		score+=25;
	}
	checkBugBonus();
	checkheartCandy();
	if(monsterTurn){
		monsterTurn=false;
		for (var i=0;i<numOfMonsters;i++){
			monsterMove(monstersPosition[i]);
		}
	}else{
		monsterTurn=true;
	}
	if(bonusBugPosition.i>=0)
		makeRandMove(bonusBugPosition);
	if(heartCandyPosition.i>=0)
		makeRandMove(heartCandyPosition);
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 60 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (time_elapsed>=gameTime ) {
		if(score<=100){
			drawGameOver();
			setTimeout(function (){window.alert("You are better than "+score+" points");}, 250)
			finishGame();
		}
		else {
			drawWinner();
			setTimeout(function () {drawWinner();window.alert("Winner!!!");}, 250)
			finishGame();

		}
	}
	if(checkLoss()){
		pacmanLives--;
		score-=10;
		var audio = new Audio('sound/buzzer.mp3');
		audio.play();
		if(pacmanLives==0){
			window.clearInterval(interval);
			$("audio")[0].pause();
			drawGameOver();
			setTimeout(function (){window.alert("Loser!");}, 250)
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
		score+=50;
		bonusBugPosition.i=-10;
		bonusBugPosition.j=-10;
	}
}
function checkheartCandy() {
	if(heartCandyPosition.i==shape.i&&heartCandyPosition.j==shape.j){
		pacmanLives=5;
		heartCandyPosition.i=-10;
		heartCandyPosition.j=-10;
	}
}
function createObstacles() {
	for (let i = 0; i < 3; i++) {
		var x=Math.floor(Math.random() * 7 + 1);
		var y=Math.floor(Math.random() * 7 + 1);
		while ((board[x][y]==4)){
			 x=Math.floor(Math.random() * 7 + 1);
			 y=Math.floor(Math.random() * 7 + 1);
		}
		var obstacle=Math.floor(Math.random() * 4.5);
		if(obstacle==0){//cube
			board[x][y]=4;
			board[x+1][y+1]=4;
			board[x+1][y]=4;
			board[x][y+1]=4;
		}else if(obstacle==1){ //right L
			board[x][y]=4;
			board[x][y+1]=4;
			board[x-1][y]=4;
		}
		else if(obstacle==2){ //left L
			board[x][y]=4;
			board[x][y-1]=4;
			board[x-1][y]=4;
		}else if(obstacle==3){ // line
			board[x][y]=4;
			board[x+1][y]=4;
			board[x-1][y]=4;
		}else if(obstacle==4){ // line
		board[x][y+1]=4;
		board[x][y]=4;
		board[x][y-1]=4;
	}
		}
}

function continueGame(board) {
	for (let i=0;i<numOfMonsters;i++){
		pos=findRandomEmptySideCell(board);
		monstersPosition[i].i=pos[0];
		monstersPosition[i].j=pos[1];
	}
}

function drawGameOver() {
	context.drawImage(gameOverImg, 50,50,500,500);
}
function drawWinner() {
	context.drawImage(winnerImg,  50,50,500,500);
}





