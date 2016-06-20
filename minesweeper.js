document.addEventListener('DOMContentLoaded', startGame)
var board = {
	cells:[]
};


function startGame () {
  var mineField = document.getElementsByClassName('board')[0].children;

  for(var i = 0; i < mineField.length; i++) {
    mineField[i].addEventListener('click',showCell);
    mineField[i].addEventListener('contextmenu',markCell);
    addCellToBoard(mineField[i]);
  }

  for(var i = 0; i < board.cells.length; i++){
  	board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
}


function showCell (evt) {
  evt.target.classList.remove('hidden');
  showSurrounding(evt.target);
}


function markCell (evt) {
  evt.preventDefault();
  evt.target.classList.toggle('marked');
  // evt.target.classList.toggle('hidden');
}

function getRow (elements) {
	var classList = elements.classList;
	for(var i = 0; i< classList.length; i++){
		if(classList[i].charAt(0) === 'r'){
			return Number(classList[i].charAt(classList[i].length-1));
		}
	}
}

function getCol (elements) {
	var classList = elements.classList;
	for(var i = 0; i< classList.length; i++){
		if(classList[i].charAt(0) === 'c'){
			return Number(classList[i].charAt(classList[i].length-1));
		}
	}
}

function addCellToBoard (elements) {
	var newCell = {
		row : getRow(elements),
		col : getCol(elements),
		isMine : elements.classList.contains('mine')
	};
	board.cells.push(newCell);
}


function countSurroundingMines (cell) {
	var surroundingCells = getSurroundingCells(cell.row, cell.col);
	var num = 0;
	for (var i = 0; i < surroundingCells.length; i++) {
		if (surroundingCells[i].isMine) {
			num++;
		}
	}
	return num;
}