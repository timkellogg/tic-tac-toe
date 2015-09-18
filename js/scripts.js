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
}

Player.prototype.move = function(move) {
  this.spaces.push(move);
};

Player.prototype.win = function() {
  var result = [],
      winningCombos = [[1, 2, 3], [4, 5, 6,], [7, 8, 9], [1, 4, 7], [2, 5 ,8], [3, 6, 9], [1, 5, 9], [3, 5, 7]],
      win =  false,
      spaces = this.spaces
  winningCombos.forEach(function(combo) {
    for (var i = 0; i <3; i++) {
      result[i] = (spaces).includes(combo[i]); //gets results for each winning combination
    }
    if ((result[0] === true) && (result[1] === true) && (result[2] === true)) {
       win = true;
    }
 });
 return win;
};

$(document).ready(function() {
  var availableSpaces = [1, 2, 3, 4, 5, 6, 7, 8, 9],
      player1 = new Player("X"),
      player2 = new Player("O"),
      playerTurn = player1,
      turns = 0,
      computer,
      player1Name,
      player2Name,
      currentPlayer;
    
  changeCursor();

  $("#PVP").on("click", function() {
    $(".play-options").hide();
    $("#pick-name").fadeIn(500);
    computer = false;
  });

  $("#PVC").on("click", function() {
    $(".play-options").hide();
    $("#game-table").fadeIn(500);
    computer = true;
  });

  $("#player-names").on("click", function() {
    player1Name = $("#player1").val()  
    player2Name = $("#player2").val() 
    if (player1Name && player2Name) {
      $("#pick-name").hide();
      $("#game-table").fadeIn(500);
      $('.turn').text(player1Name + "'s Turn");
    } else {
      $('#noNameModal').modal('show');
    }
  });

  function renderMsgs() {
    $(".result").show();
    $('.turn').hide();
  }

  function renderCat() {
    $("#game-table").empty();
    $("#game-table").append(
        "<div id='cat-container'>" +
          "<img class='img-rounded' src='public/gladiator-cat.jpg'>" +
        "</div>"
    ).hide().fadeIn(2000);
  }

  function renderRestartBtn() {
    $('#msg-container').append("<button id='restart' class='btn btn-default'>Play again?</button>");
    $('#restart').on("click", function() {
      location.reload();
    });
  }

  function changeCursor() {
    if (turns % 2 === 0 || turns === undefined) {
      $("#game-table").removeClass("o-cursor").addClass("x-cursor");
    } else {
      $("#game-table").removeClass("x-cursor").addClass("o-cursor");
    }
  }

  function endCursor() {
    $("#game-table").css("cursor", "pointer");
  }

  function renderWinGame() {
    renderRestartBtn();
    renderMsgs();
    endCursor()
    $(".cell-value").off();
  }

  function tieGame() {
    $('span#winner').text('Game over. Fight to the DEATH (or play again)!')
    renderCat();
    renderMsgs();
    renderRestartBtn();
    endCursor()
  }

  var computerPick = function() {
    var selection = availableSpaces[Math.floor(Math.random()*availableSpaces.length)];
    $("#" + selection).text(playerTurn.mark);
    playerTurn.move(selection);
    var index = availableSpaces.indexOf(selection);
    availableSpaces.splice(index, 1);
    turns++;
    changeCursor();
    if (playerTurn.win() === true) {
      $('span#winner').text('Sorry! Computer wins!');
      renderWinGame()
    } else if (turns === 9) {
      tieGame();
    } else {
      playerTurn = playerTurn === player1 ? player2 : player1;
      $('.turn').text("Player " + playerTurn.mark + "'s Turn");
    };
  }

  $(".cell-value").click(function() {
    if ( $(this).text() === "" ) {
      $(this).text(playerTurn.mark);
      var spaceId = parseInt( $(this).attr('id') );
      playerTurn.move(spaceId);
      var index = availableSpaces.indexOf(spaceId);
      availableSpaces.splice(index, 1);
      if (playerTurn.mark === "X") { 
        currentPlayer = player1Name; 
      } else { 
        currentPlayer = player2Name; 
      }
      turns++;
      changeCursor();
      if (playerTurn.win() === true) {
        if (computer) { currentPlayer === "You"; }
        $('span#winner').text('Congrats! ' + currentPlayer + ' won!');
        renderWinGame()
      } else if (turns === 9) {
        tieGame();
      } else {
        playerTurn = playerTurn === player1 ? player2 : player1;
        $('.turn').text(currentPlayer + "'s Turn");
        if (computer) { 
          setTimeout(computerPick, 500); 
          endCursor();
        }
      };
    } else {
      $('#cheaterModal').modal('show');
    }
  });
});