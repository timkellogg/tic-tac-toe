// Used MDN array protoype so that we can have an includes method


Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
  'use strict';
  var O = Object(this);
  var len = parseInt(O.length) || 0;
  if (len === 0) {
    return false;
  }
  var n = parseInt(arguments[1]) || 0;
  var k;
  if (n >= 0) {
    k = n;
  } else {
    k = len + n;
    if (k < 0) {k = 0;}
  }
  var currentElement;
  while (k < len) {
    currentElement = O[k];
    if (searchElement === currentElement ||
      (searchElement !== searchElement && currentElement !== currentElement)) {
        return true;
      }
      k++;
    }
    return false;
  };





function Player (mark) {
  this.mark = mark;
  this.spaces = [];
  // this.win = false
}

Player.prototype.move = function(move) {
  this.spaces.push(move);
};

// this prototype tests to see if a player has a winning combination of spaces

Player.prototype.win = function(spaces) {
  var result = [];
  var winningCombos = [[1, 2, 3], [4, 5, 6,], [7, 8, 9], [1, 4, 7], [2, 5 ,8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
  var win =  false;
  winningCombos.forEach(function(combo) {
    debugger;
    for (var i = 0; i <3; i++) {
      result[i] = spaces.includes(combo[i]);
    }
    if ((result[0] === true) && (result[1] === true) && (result[2] === true)) {
       win = true;
    }

 });
 return win;
};
