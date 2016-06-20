document.addEventListener('DOMContentLoaded', startGame)
var board = {
	cells:[]
};


function startGame () {
  var board = document.getElementsByClassName('board')[0].children;

  for(var i = 0; i < board.length; i++) {
    board[i].addEventListener('click',showCell);
    board[i].addEventListener('contextmenu',markCell);
    getRow(board[i]);
  }
}


function showCell (evt) {
  evt.target.classList.remove('hidden');
}


function markCell (evt) {
  evt.preventDefault();
  evt.target.classList.toggle('marked');
}

function getRow (elements) {
	var classList = elements.classList;
	for(var i = 0; i< classList.length; i++){
		if(classList[i].charAt(0) === 'r'){
			return Number(classList[i].charAt(classList[i].length-1));
		}
	}
}