const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');

// create the unit
const box = 32;

// load images
const ground = new Image();
ground.src = 'img/ground.png';

const foodImg = new Image();
foodImg.src = 'img/food.png';

// load Audio
let dead = new Audio();
dead.src = 'audio/dead.mp3'
let down = new Audio();
down.src = 'audio/down.mp3'
let eat = new Audio();
eat.src = 'audio/eat.mp3'
let left = new Audio();
left.src = 'audio/left.mp3'
let right = new Audio();
right.src = 'audio/right.mp3'
let up = new Audio();
up.src = 'audio/up.mp3'

// create the snake
let snake = [];
snake[0] = {
	x : 9 * box,
	y : 10 * box
}

// create the food
let food = {
	x : Math.floor(Math.random() * 17 + 1) * box,
	y : Math.floor(Math.random() * 15 + 3) * box
} 

// create the score var
let score = 0;

// control the snake
let d;

document.addEventListener('keydown', direction) 

function direction(event) {
	if (event.keyCode == 37 && d != "RIGHT") {
		left.play();
		d = "LEFT";
	} else if (event.keyCode == 38 && d != "DOWN") {
		up.play();
		d = "UP";
	} else if (event.keyCode == 39 && d != "LEFT") {
		right.play();
		d = "RIGHT";
	} else if (event.keyCode == 40 && d != "UP") {
		down.play();
		d = "DOWN";
	}
}

// check collision
function collision(head, array) {
	for (let i = 0; i < array.length; i++) {
		if (head.x == array[i].x && head.y == array[i].y) {
			return true;
		}
	}
	return false;
}

// draw everything to the canvas
function draw() {

	ctx.drawImage(ground, 0, 0);

	for (let i = 0; i < snake.length; i++) {
		ctx.fillStyle = (i == 0) ? "green" : "white";
		ctx.fillRect(snake[i].x, snake[i].y, box, box)

		ctx.strokeStyle = "red"
		ctx.strokeRect(snake[i].x, snake[i].y, box, box)
	}

	ctx.drawImage(foodImg, food.x, food.y);


	// old head position
	snakeX = snake[0].x;
	snakeY = snake[0].y;

	// which direction
	if (d == "LEFT") snakeX -= box;
	if (d == "UP") snakeY -= box;
	if (d == "RIGHT") snakeX += box;
	if (d == "DOWN") snakeY += box;
	
	// if snake eats the food
	if (snakeX == food.x && snakeY == food.y) {
		eat.play();
		score++;
		food = {
			x : Math.floor(Math.random() * 17 + 1) * box,
			y : Math.floor(Math.random() * 15 + 3) * box
		}

	// we don't remove the tail
	} else {
		snake.pop();
	}

	// add new Head
	let newHead = {
		x : snakeX,
		y : snakeY
	}

	// game over
	if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
		clearInterval(game);
		dead.play();
		location.reload();
	}

	snake.unshift(newHead);
	
	ctx.fillStyle = "white";
	ctx.font = "45px Changa One";
	ctx.fillText(score, 2 * box, 1.6 * box)
}

// call draw function every 100 ms
let game = setInterval(draw, 100);
