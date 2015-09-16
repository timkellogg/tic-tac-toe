function Player (mark, spaces) {
  this.mark = mark;
  this.spaces = [];
}

Player.prototype.move = function(move) {
  this.spaces.push(move);
}
