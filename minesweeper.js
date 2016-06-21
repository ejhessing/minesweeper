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
  //check to see if clicked on a mine
  if(evt.target.classList.contains('mine')){
    showAllMines();
    alert("Sorry you lost!");
    reset();
  } else {
    showSurrounding(evt.target);
    evt.target.classList.remove('hidden');
    checkForWin();
  }
}

function markCell (evt) {
  //stops the right click button from opening up a menu
  evt.preventDefault();
  //toggle marked and hidden classes
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

//gets the row number
function getRow (elements) {
	var classList = elements.classList;
	for(var i = 0; i< classList.length; i++){
		if(classList[i].charAt(0) === 'r'){
			return Number(classList[i].charAt(classList[i].length-1));
		}
	}
}

//gets the column number
function getCol (elements) {
	var classList = elements.classList;
	for(var i = 0; i< classList.length; i++){
		if(classList[i].charAt(0) === 'c'){
			return Number(classList[i].charAt(classList[i].length-1));
		}
	}
}

//create the cell Object
function addCellToBoard (elements) {
	var newCell = {
		row : getRow(elements),
		col : getCol(elements),
		isMine : elements.classList.contains('mine')
	};
	board.cells.push(newCell);
}


function countSurroundingMines (cell) {
	var surroundingCells = getSurroundingCells(cell.row, cell.col),
	    num = 0;
//check how many mines are around the cell we just clicked
	for (var i = 0; i < surroundingCells.length; i++) {
		if (surroundingCells[i].isMine) {
			num++;
		}
	}
	return num;
}


function checkForWin () {
  var num = 0,
      mineField = document.getElementsByClassName('board')[0].children;

  for (var i = 0; i<board.cells.length; i++) {
    //if they clicked is Marked but not true, it still adds to the number
  	if (board.cells[i].isMine === false && board.cells[i].isMarked === true) {
  		num++;
  	} else if (board.cells[i].isMine === true && board.cells[i].isMarked === true) {
      num++;
    }
  }
  //if 5 cells are marked then checks to see if the hidden class has been removed from all other cells
  if (num === 5) {
	  for (var i = 0; i<mineField.length; i++) {
	  	if (mineField[i].classList.contains('hidden')) {
	  		return;
	  	}
	  }
	  alert("You Have Won!");
    reset();
    //if they have marked more than the required amount
  } else if (num > 5) {
    showAllMines();
    alert("Sorry you lost.  This Mine Field didn't have so many mines!");
    reset();
  }
}

//if they lost, it will reveal where the mines were
function showAllMines () {
  var mineField = document.getElementsByClassName('board')[0].children;

  for (var i = 0; i<mineField.length; i++) {
    //checks if it contains the class hidden or if it contains the class marked, but it is not a mine then reveal it isn't
    if (mineField[i].classList.contains('hidden') || mineField[i].classList.contains('marked') && board.cells[i].isMine === false) {
      mineField[i].classList.remove('hidden');
      mineField[i].classList.remove('marked');
    }
  }
}

//reset the game
function reset () {
  var mineField = document.getElementsByClassName('board')[0].children;
  //reset hidden and marked classes and set html back to none
  for (var i = 0; i<mineField.length; i++) {
    mineField[i].classList.add('hidden');
    mineField[i].classList.remove('marked');
    mineField[i].innerHTML = '';

  }
  //clear the board
  board = {
    cells:[]
  };
  //recall startGame function.
  startGame();
}