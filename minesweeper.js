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
  if(evt.target.classList.contains('mine')){
    showAllMines();
    alert("Sorry you lost!");
  }

  showSurrounding(evt.target);
  evt.target.classList.remove('hidden');
  checkForWin();
}


function markCell (evt) {
  evt.preventDefault();
  evt.target.classList.toggle('marked');
  evt.target.classList.toggle('hidden');

  //add isMarked to the cells object
  for(var i =0; i<board.cells.length;i++){
  	if(board.cells[i].row === getRow(evt.target) && board.cells[i].col === getCol(evt.target)){
  		board.cells[i].isMarked = true;
  	}
  }
  checkForWin();
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


function checkForWin () {
	var num = 0;
var mineField = document.getElementsByClassName('board')[0].children;
  for (var i = 0; i<board.cells.length; i++) {
  	if(board.cells[i].isMine === true && board.cells[i].isMarked === true){
  		num++;
  	}
  }

  if (num === 5) {
	  for (var i = 0; i<mineField.length; i++) {
	  	if (mineField[i].classList.contains('hidden')) {
	  		return;
	  	}
	  }
	  alert("You Have Won!");
  } else {
  	return;
  }

}

function showAllMines () {
  var mineField = document.getElementsByClassName('board')[0].children;
    for (var i = 0; i<mineField.length; i++) {
      if(mineField[i].classList.contains('hidden')) {
        mineField[i].classList.remove('hidden');

      }
    }

}