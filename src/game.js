const Game = function(){
  this.score = 0;
};

Game.prototype.updateScore = function(){
  this.score+=10;
};

Game.prototype.getScore = function(){
  return this.score;
};
