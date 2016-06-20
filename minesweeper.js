document.addEventListener('DOMContentLoaded', startGame)

function startGame () {
  var board = document.getElementsByClassName('board')[0].children;

  for(var i = 0; i < board.length; i++) {
    board[i].addEventListener('click',showCell);
    board[i].addEventListener('contextmenu',markCell);
  }
}


function showCell (evt) {
  evt.target.classList.remove('hidden');
}


function markCell (evt) {
  evt.preventDefault();
  evt.target.classList.toggle('marked');
}
