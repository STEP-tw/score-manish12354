const Score = function(increment){
  this.increment = increment;
  this.score = 0;
};

Score.prototype.updateScore = function(){
  this.score+=this.increment;
};

Score.prototype.getScore = function(){
  return this.score;
};
