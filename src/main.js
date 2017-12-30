let game=undefined;
let numberOfRows=60;
let numberOfCols=120;
const score = new Score(10);

let animator=undefined;

const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if(game.hasSnakeEatenFood()) {
    game.updateScore();
    showScore();
    game.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(game.getFood());
  }
}

const changeSnakeDirection=function(event) {
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

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();

  snake=new Snake(head,body);
  game.addSnake(snake);
}


const createGame=function() {
  let topLeft=new Position(0,0,"east");
  let bottomRight=new Position(numberOfCols,numberOfRows,"east");
  game=new Game(topLeft,bottomRight);
}

const startGame=function() {
  createGame();
  createSnake();
  game.addSnake(snake);
  game.addScore();
  game.createFood();
  game.createFood();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(game.getSnake());
  drawFood(game.getFood());
  addKeyListener();
  animator=setInterval(animateSnake,140);
}

window.onload=startGame;
