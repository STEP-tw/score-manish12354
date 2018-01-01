let game = undefined;
let numberOfRows = 60;
let numberOfCols = 120;

let animator = undefined;

const animateSnake = function() {
  let details = game.move();
  let oldHead = details.oldHead;
  let oldTail = details.oldTail;
  let head = details.head;
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if (game.hasSnakeEatenFood()) {
    game.updateScore();
    let score = game.getScore();
    showScore(score);
    game.grow();
    game.createFood(numberOfRows, numberOfCols);
    drawFood(game.getFood());
  }
}

const changeSnakeDirection = function(event) {
  switch (event.code) {
    case "KeyA":
      game.turnLeft();
      break;
    case "KeyD":
      game.turnRight();
      break;
    case "KeyC":
      game.grow();
      break;
    default:
  }
}

const addKeyListener = function() {
  let grid = document.getElementById("keys");
  grid.onkeyup = changeSnakeDirection;
  grid.focus();
}

const createSnake = function() {
  let tail = new Position(12, 10, "east");
  let body = [];
  body.push(tail);
  body.push(tail.next());
  let head = tail.next().next();
  let snake = new Snake(head, body);
  return snake;
}


const createGame = function() {
  let topLeft = new Position(0, 0, "east");
  let bottomRight = new Position(numberOfCols, numberOfRows, "east");
  game = new Game(topLeft, bottomRight);
}

const startGame = function() {
  createGame();
  let snake = createSnake();
  game.addSnake(snake);
  game.createFood();
  game.createFood();
  drawGrids(numberOfRows, numberOfCols);
  drawSnake(game.getSnake());
  drawFood(game.getFood());
  addKeyListener();
  animator = setInterval(animateSnake, 140);
}

window.onload = startGame;
