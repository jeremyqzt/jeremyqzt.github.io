
const PieceEnum = Object.freeze({"white":0, "black":1, });
const PieceColors = ["lavender", "black"];

class StatsManager {

	constructor(stats,x,y,height, initialPiece) {
		stats.setAttribute("class","statBoard");
		//stats.style.position = "absolute";
		stats.style.left = 50 + "px";
		stats.style.height = height - 8 + "px";
		//stats.style.backgroundColor = "black";
		this.stats = stats;
		this.createTurnInfo(this.stats, initialPiece);
		this.createStatInfo(this.stats);
		this.createComputerPlayerOpts(this.stats);
	}

	setWinnerInfo(winner) {
		this.turnReversiPiece.setType(winner);
		var winnerText = "";
		if (winner != null) {
			winnerText = (winner == PieceEnum.white) ? "White": "Black" 
			winnerText = winnerText + " Has Won the Game!";
			this.curTurnTextHeader.innerHTML = winnerText;
		} else {
			winnerText = "No one has won, its a Tie!"
			this.curTurnTextHeader.innerHTML = winnerText;
		}
	}

	setTurnInfo(type, computerThinking) {
		var text = "Black to Move!"

		if (computerThinking) {
			text = "Computer is thinking..."
		}

		if (type == PieceEnum.black) {
			this.turnReversiPiece.setType(type);
		} else {
			text = "White to Move!"
			this.turnReversiPiece.setType(type);
		}
		this.curTurnTextHeader.innerHTML = text;
	}

	updateStatsInfo(black, white, empty) {
		this.whiteText.innerHTML = "x" + ("0" + white).slice(-2);
		this.blackText.innerHTML = "x" + ("0" + black).slice(-2);
		this.emptyText.innerHTML = "x" + ("0" + empty).slice(-2);
	}

	createStatInfo(parentDiv) {
		var statsHeader = document.createElement('h5');
		var whiteCount = document.createElement('div');
		var blackCount = document.createElement('div');
		var emptyCount = document.createElement('div');
		var whiteText = document.createElement('p');
		var blackText = document.createElement('p');
		var emptyText = document.createElement('p');

		this.statsHeader = parentDiv.appendChild(statsHeader);
		this.whiteCountEl = parentDiv.appendChild(whiteCount);
		this.whiteText = parentDiv.appendChild(whiteText);

		this.blackCountEl = parentDiv.appendChild(blackCount);
		this.blackText = parentDiv.appendChild(blackText);

		this.emptyCountEl = parentDiv.appendChild(emptyCount);
		this.emptyText = parentDiv.appendChild(emptyText);

		this.statsHeader.setAttribute("class","font-weight-light");
		this.whiteText.setAttribute("class","font-weight-light");

		this.blackText.setAttribute("class","font-weight-light");

		this.emptyText.setAttribute("class","font-weight-light");

		this.whiteText.innerHTML = "x02";
		this.blackText.innerHTML = "x02";
		this.emptyText.innerHTML = "x60";

		this.statsHeader.width = "100%";
		this.statsHeader.innerHTML = "Current Game Stats";


		this.whiteCountEl.style.height = "10%";
		this.whiteCountEl.setAttribute("class", "statsPanel");
		this.whiteText.setAttribute("class", "statsPanel");
		this.whiteText.style.width = "10%";
		var info = this.whiteCountEl.getBoundingClientRect();
		this.whiteCountEl.style.width = info.height + "px";
		this.whiteCountEl.style.margin = "0px";

		this.blackCountEl.style.height = "10%";
		this.blackCountEl.setAttribute("class", "statsPanel");
		this.blackText.setAttribute("class", "statsPanel");
		this.blackText.style.width = "10%";
		info = this.blackCountEl.getBoundingClientRect();
		this.blackCountEl.style.width = info.height + "px";
		this.blackCountEl.style.margin = "0px";

		this.emptyCountEl.style.height = "10%";
		this.emptyCountEl.setAttribute("class", "statsPanel");
		this.emptyText.setAttribute("class", "statsPanel");
		this.emptyText.style.width = "10%";
		info = this.emptyCountEl.getBoundingClientRect();
		this.emptyCountEl.style.width = info.height + "px";
		this.emptyCountEl.style.margin = "0px";


		this.baseWhite = new ReversiPiece(PieceEnum.white, this.whiteCountEl);
		this.baseBlack = new ReversiPiece(PieceEnum.black, this.blackCountEl);
		this.baseEmpty = new ReversiPiece(null, this.emptyCountEl);

	}

	createTurnInfo(parentDiv, piece) {
		var turnInfoHeader = document.createElement('H5');
		var turnFullInfo = document.createElement('div');
		var turnPiece = document.createElement('div');
		var turnText = document.createElement('div');
		var turnTextInner = document.createElement('p');

		this.turnInfoHeader = parentDiv.appendChild(turnInfoHeader);
		this.curTurnPiece = parentDiv.appendChild(turnPiece);
		this.curTurnContain = parentDiv.appendChild(turnText);
		this.curTurnTextHeader = this.curTurnContain.appendChild(turnTextInner);

		this.curTurnTextHeader.innerHTML = "Black to Move!";

		this.curTurnTextHeader.setAttribute("class","font-weight-light align-middle");

		this.turnInfoHeader.setAttribute("class","font-weight-light");

		this.turnInfoHeader.width = "100%";
		this.turnInfoHeader.innerHTML = "Turn Information";

		this.curTurnPiece.style.height = "15%";
		this.curTurnContain.style.height = "15%";
		this.curTurnContain.style.width = "70%";
		this.curTurnContain.setAttribute("class", "statsPanel");
		this.curTurnContain.style.textAlign = "center";
		this.curTurnPiece.setAttribute("class", "statsPanel");


		var info = this.curTurnPiece.getBoundingClientRect();
		this.curTurnPiece.style.width = info.height + "px";
		this.curTurnPiece.style.margin = "0px";
		this.turnReversiPiece = new ReversiPiece(piece, this.curTurnPiece);
	}

	createComputerPlayerOpts(parentDiv) {
		var aiSelectHeader = document.createElement('H5');
		var selectionDiv = document.createElement('div');

		var playerOpts = [
			{ value: 0, description: "Human Player"},
			{ value: 1, description: "Computer: Random Move"},
			{ value: 2, description: "Computer: Best Move"},
			{ value: 3, description: "Computer: Min-Max move"}
		];

		this.aiList = document.createElement("select");
		for (var i = 0; i < playerOpts.length; i++) {
			var option = document.createElement("option");
			option.innerHTML = playerOpts[i].description;
			option.value = playerOpts[i].value;
			this.aiList.options.add(option);
		}

		this.aiSelectHeader = parentDiv.appendChild(aiSelectHeader);
		this.aiSelectHeader.setAttribute("class","font-weight-light");

		var aiSelect = selectionDiv.appendChild(this.aiList);
		selectionDiv.style.width = "100%";
		parentDiv.appendChild(aiSelect);
		aiSelect.style.width= "100%";
		this.aiSelectHeader.innerHTML = "AI Options";
	}

	getAiSelect() {
		return this.aiList.value;
	}

	setAiSelectDisable(avail) {
		this.aiList.disabled = avail;
	}
}

class Reversi {
	constructor(name, stats, initialArrangement, initialMover) {
		this.computerMakingMove = false;

		this.pieceClicked = null;
		this.moves = [];

		if (initialMover == null) {
			this.turn = PieceEnum.white;
		} else {
			this.turn = initialMover;
		}

		this.initialArrangement = initialArrangement;

		this.wouldBeFlippedPieces = [];
		this.boardCheckerCount = 8;

		this.board = new ReversiGrid(document.getElementById(name), this, this.initialArrangement);
		var moves = this.board.getExtremePieces()
		this.avail = this.computeAvailableMoves(moves, this.turn);

		if (name != null) {
			this.board.highlightGrid(this.avail);
			var info = this.board.getPositionInfo();
			this.statsManager = new StatsManager(document.getElementById(stats), info.x + info.width, info.y, info.height, this.turn);
			this.statsManager.setTurnInfo(this.turn, false);
		}
	}

	getflipTurn() {
		var ret = (this.turn == PieceEnum.white) ? PieceEnum.black: PieceEnum.white;
		return ret;
	}

	async moveCallBack(i, j, pieceSelected) {
		//console.log("Move Called Back, Location: " + i +", " + j + " Piece Selected: " + pieceSelected);
		//this.board.unHighlightGrid();
		if (!pieceSelected)	{
			if (this.computeMove(i, j, this.turn) && !this.computerMakingMove && (this.statsManager.getAiSelect() != 0)) {
				this.computerMakingMove = true;
				var diff = this.statsManager.getAiSelect();
				var move = null;
				var moveChoice = null;
				var whiteCantMove = true;

				while (whiteCantMove) {
					whiteCantMove = false;
					if (diff == 1) {
						move = RandomAI.getRandomMove(this.avail);
						await new Promise(r => setTimeout(r, 100)); //Sleep according to difficulty
					} else if (diff == 2) {
						move = GreedyAI.getGreedyMove(this.avail, this.wouldBeFlippedPieces);
						await new Promise(r => setTimeout(r, 300)); //Sleep according to difficulty
					} else if (diff == 3) {
						//index 0 is the amount of +ve the algo sees
						moveChoice = MinMaxAlgo.getMinMaxMove(this.board.getPieces(), 3, this.turn);
						move = moveChoice[1];
						await new Promise(r => setTimeout(r, 600)); //Sleep according to difficulty
					}
					if (this.avail.length > 0){
						this.computeMove(move[0], move[1], this.turn);
						console.log(whiteCantMove);
						whiteCantMove = (this.avail.length == 0)? true: false;
					} else {
						this.turn = (this.turn == PieceEnum.white) ? PieceEnum.black: PieceEnum.white;
						this.recomputeMoves(true);
					}
				}
				this.computerMakingMove = false;
			}

		}
	}

	computeValid(i,j) {
		for (var y = 0; y < this.avail.length; y++) {
			if (this.avail[y][0] ==i && this.avail[y][1] == j) {
				return y;
			}
		}
		return -1;
	}

	getActivePieces() {
		return this.board.getPieces();
	}

	checkWinner(black, white, empty) {
		if (empty == 0) {
			if (black > white) {
				return PieceEnum.black;
			} else if (white > black) {
				return PieceEnum.white
			} else {
				return null;
			}
		}
		return empty;
	}

	updateStats() {
		var count = this.board.countPieces();
		this.statsManager.updateStatsInfo(count[0], count[1], count[2]);
		this.statsManager.setTurnInfo(this.turn, (this.statsManager.getAiSelect() != 0));
		if (this.turn == PieceEnum.black) {
			this.statsManager.setAiSelectDisable("true");
		} else {
			this.statsManager.setAiSelectDisable(""); //This is enabling
		}

		this.winner = this.checkWinner(count[0], count[1], count[2]);
		if (this.winner == null) { //No one
			this.setWinner(this.winner);
		} else if (this.winner === PieceEnum.white || this.winner === PieceEnum.black) {
			this.setWinner(this.winner);
		}
	}

	setWinner(type) {
		this.statsManager.setWinnerInfo(type);
	}

	computeMove(i, j, turn) {
		//You must absolute flip a piece to be considered a valid move
		var index = -1;
		if ((index = this.computeValid(i, j)) != -1) {
			if (this.turn == PieceEnum.white){
				this.board.makeMove(i, j, turn);
				this.turn = PieceEnum.black;
			} else {

				this.board.makeMove(i, j, turn);
				this.turn = PieceEnum.white;
			}
			this.board.flipPieces(this.wouldBeFlippedPieces[index]);
		} else {
			return false;
		}

		this.recomputeMoves(false);

		return true;
	}

	recomputeMoves(forceHighlight) {
		this.updateStats();
		this.board.unHighlightGrid();
		var moves = this.board.getExtremePieces()
		this.avail = this.computeAvailableMoves(moves, this.turn);
		//console.log(this.avail);

		//Computer knows where to go, no need highlight, human needs highlighting
		if (this.computerMakingMove || (this.statsManager.getAiSelect() == 0) || forceHighlight) {
			this.board.highlightGrid(this.avail);
		}

	}

	computeAvailableMoves(moves, turn) {
		var toTest = null;
		var start = false;
		var ret = [];
		var flipped = [];
		this.wouldBeFlippedPieces = [];

		for (var move = 0; move < moves.length; move++) {
			toTest = moves[move];
			start = false;
			for (var a = -1; a <=1; a++) { //Computer the 8 directions for the move
				for (var b = -1; b <=1; b++) {
					if (a != 0 || b != 0) {
						var evalResult = this.board.computeDirectionalUntilRepeat(toTest[0], toTest[1], a, b, turn);

						//Evaluate the pop first!
						start = evalResult.pop() || start;

						if (evalResult.length > 0) {
							var curIndex = ret.length;
							if (!this.wouldBeFlippedPieces[curIndex]) {
								this.wouldBeFlippedPieces[curIndex] = [];
							}
							this.wouldBeFlippedPieces[curIndex] =  this.wouldBeFlippedPieces[curIndex].concat(evalResult);
						}
					}
				}
			}

			if (start) {
				ret = ret.concat([toTest]);
			}
		}

		return ret;
	}

}


class ReversiGrid{
	constructor(location, game, initPiece){
		//console.log("Rendering Board with inidividual: " + individualWidth + "x" + individualHeight);

		this.grid = [];        //Grid is the empty checker grid
		this.pieces = [];      //Pieces is per piece class representation
		this.initializeArrs();
		this.mainBoard = false;
		this.location = location;

		if (initPiece == null) {
			location.setAttribute("class","gameBoard");
			var positionInfo = location.getBoundingClientRect();
			location.style.height = positionInfo.width + "px";
			positionInfo = location.getBoundingClientRect();

			//Need to inform game logic when a move is made
			this.game = game;

			var individualWidth = Math.floor(positionInfo.width / 8);
			var individualHeight = Math.floor(positionInfo.height / 8);
			this.mainBoard = true;
			this.renderGameBoard(individualWidth, individualHeight);
			this.renderInitialPieces();
		} else {
			this.pieces = initPiece;
		}

		this.extremePieces = this.getAdjacentOfFilled();
		//this.highlightGrid(this.extremePieces);
	}

	getPieces () {
		if (!this.mainBoard) {
			return this.getUnstrippedPieces();
		} else {
			return this.getStrippedPieces();
		}
	}


	getUnstrippedPieces () {
		return this.pieces;
	}

	//Returns 'phantom pieces', without the location
	getStrippedPieces () {
		var ret = [];
		for (var i = 0; i < this.pieces.length; i++) {
			ret[i] = [];
			for (var j = 0; j < this.pieces[i].length; j++) {
				ret[i][j] = null;
				if (this.pieces[i][j] != null) {
					ret[i][j] = new ReversiPiece(this.pieces[i][j].getType(), null);
				}
			}
		}
		return ret;
	}

	getPositionInfo() {
		return this.location.getBoundingClientRect();
	}

	flipPieces(pieceArr) {
		for (var i = 0; i< pieceArr.length; i++) {
			this.pieces[pieceArr[i][0]][pieceArr[i][1]].flip();
		}
	}

	debugGrid() {
		for (var i = 0; i< this.grid.length; i++) {
			for (var j = 0; j < this.grid[i].length; j++) {
				this.grid[i][j].innerHTML = i + ", " + j;
			}
		}
	}

	countPieces() {
		var ret = [0, 0, 0]
		for (var i = 0; i< this.grid.length; i++) {
			for (var j = 0; j < this.grid[i].length; j++) {
				if (this.pieces[i][j] == null) {
					ret[2]++;
				} else if (this.pieces[i][j].getType() == PieceEnum.white) {
					ret[1]++;
				} else {
					ret[0]++;
				}

			}
		}
		return ret;
	}

	computeDirectionalUntilRepeat(i, j, iIter, jIter, type) {
		var otherType = (type == PieceEnum.white)? PieceEnum.black: PieceEnum.white;

		var inBetweenPieces = []

		//Does not bring us to an edge
		if ((i + iIter >= 0 && i + iIter < 8) && (j + jIter >= 0 && j + jIter < 8))
		{

			//next piece exists
			if (this.pieces[i+iIter][j+jIter] == null) {
				return [false];
			}

			//Next Piece is oppsite
			if (this.pieces[i+iIter][j+jIter].getType() == otherType) {

				//Loop until we find another of us
				inBetweenPieces = inBetweenPieces.concat([[i+iIter, j+jIter]]);
				for (var x = i + 2*iIter, y = j + 2*jIter; (x >= 0) && (x < 8) && (y >= 0) && (y < 8); x += iIter, y += jIter) {

					//Next, next piece is end, so cant do anything here...
					if ((x > 7) || (x < 0) || (y > 7) || (y < 0)){
						return [false];
					}

					inBetweenPieces = inBetweenPieces.concat([[x,y]]);

					//End of Line
					if (this.pieces[x][y] == null) {
						return [false];
					}

					if (this.pieces[x][y].getType() == type) {
						inBetweenPieces[inBetweenPieces.length - 1] = true; //Don't care about final piece, it is one of us
						return inBetweenPieces;                             //Game logic can force flip of these pieces
					}
				}
			}
		}

		return [false];
	}

	getExtremePieces() {
		return this.extremePieces;
	}

	/* In Reversi, you can only make a move if a opposing piece is turned over
	It can be safely said that when a move is made, it is made on an 'extreme' location
	therefore, we can just recompute based on that piece */
	recomputeExtremePiece(i, j) {
		for (var z = 0; z < this.extremePieces.length; z++) {
			if (this.extremePieces[z][0] == i && this.extremePieces[z][1] == j)
			{
				this.extremePieces.splice(z, 1);
				break;
			}
		}

		for (var z = i - 1; z <= (i + 1) && z <= 7; z++) {
			for (var x = j - 1; x <= (j + 1) && x <= 7; x++){
				if (!this._isPiecePresent(z,x) && !this._isCoordinateDup(this.extremePieces, z, x)) {
					if (z >= 0 && z <= 7 && x >= 0 && x <= 7) {
						this.extremePieces = this.extremePieces.concat([[z,x]]);
					}
				}
			}
		}
	}

	_isPiecePresent(i, j){
		if (i <= 7 && i >= 0) {
			if (j <= 7 && j >= 0){
				if (this.pieces[i][j] != null) {
					return true;
				}
			}
		}
		return false;
	}

	_isCordValid(i, j) {
		if (i < 8 && i >=0 && j < 8 && j >= 0) {
			return true;
		}

		return false;
	}

	_isCoordinateDup(arr, i, j) {
		for (var z = 0; z < arr.length; z++) {
			if (arr[z][0] == i && arr[z][1] == j)
			{
				return true;
			}
		}
		return false;
	}


	/* If it isn't clear - an extreme piece is a piece that has atleast 1 neighbour that isn't
	already occupied by another piece, this function calculates adjacent blocks on all occupied
	pieces. Therefore, this function is a base calculation of a extreme piece */
	getAdjacentOfFilled() {
		var filled = this.getFilledSpaces()
		var curRow = 0;
		var curCol = 0;
		var adj =  [];

		for (var i = 0; i< filled.length; i++) {
			curRow = filled[i][0];
			curCol = filled[i][1];
			for (var z = curRow - 1; z <= (curRow + 1); z++) {
				for (var x = curCol - 1; x <= (curCol + 1); x++){
					if (!this._isPiecePresent(z, x) && !this._isCoordinateDup(adj, z, x) && this._isCordValid(z, x)) {
						 adj = adj.concat([[z, x]]);
					}
				}
			}
		}
		return adj;
	}


	getFilledSpaces() {
		var ret = [];
		for (var i = 0; i < this.pieces.length; i++) {
			for (var j = 0; j < this.pieces[i].length; j++) {
				if (this._isPiecePresent(i,j)) {
					ret = ret.concat([[i,j]]);
				}
			}
		}
		return ret;
	}

	getTypedSpaces(type) {
		var ret = 0;
		for (var i = 0; i < this.pieces.length; i++) {
			for (var j = 0; j < this.pieces[i].length; j++) {
				if (this._isPiecePresent(i,j)) {
					if (this.piecesp[i][j].getType() == type) {
						ret++;
					}
				}
			}
		}
		return ret;
	}


	getEmptySpaces() {
		var ret = [];
		for (var i = 0; i < this.pieces.length; i++) {
			for (var j = 0; j < this.pieces[i].length; j++) {
				if (this.pieces[i][j] == null){
					ret = ret.concat([[i,j]]);
				}
			}
		}
		return ret;
	}

	/* This function assumes that the move is valid,
		making a move also forces re-computation of extreme pieces*/
	makeMove(row, column, pieceType) {
		if (this.location != null) {
			this.pieces[row][column] =  new ReversiPiece(pieceType, this.grid[row][column]);
		} else {
			this.pieces[row][column] =  new ReversiPiece(pieceType, null);
		}

		this.recomputeExtremePiece(row, column);
	}

	highlightGrid(moves){
		var highlight = "#fcba03";
		this.moves = moves;
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].length == 0){
				continue;
			}
			this.grid[moves[i][0]][moves[i][1]].style.backgroundColor = highlight;
			this.grid[moves[i][0]][moves[i][1]].highlighted = true;
		}
	}

	unHighlightGrid(){
		var highlight = 'rgb(252, 186, 3)';

		for (var i = 0; i < this.grid.length; i++) {
			for (var j = 0; j < this.grid[i].length; j++) {
				if (this.grid[i][j].highlighted == true) {
					this.grid[i][j].style.backgroundColor = this.grid[i][j].originalColor;
					this.grid[i][j].highlighted == false;
				}
			}
		}
	}

	getMove(evt) {
		var i = evt.currentTarget.myParam[0];
		var j = evt.currentTarget.myParam[1];

		var clickedPiece = this.pieces[i][j];
		var clickedLocation = [i, j];

		//console.log("Location Clicked: " + i + ", "+ j);

		//Location + pieceClicked?
		this.game.moveCallBack(i, j, clickedPiece);
	}

	initializeArrs() {
		var boardCheckerCount = 8;
		for (var i = 0; i < boardCheckerCount; i++) {
			this.grid[i] = [];
			this.pieces[i] = [];
			for (var j = 0; j < boardCheckerCount; j++) {
				this.grid[i][j] = null;
				this.pieces[i][j] = null;
			}
		}
	}

	renderGameBoard(individualWidth, individualHeight) {
		var opt1 = "white";
		var opt2 = "#505160";
		var startColor = opt1;

		var boardCheckerCount = 8;

		for (var i = 0; i < boardCheckerCount; i++) {
			for (var j = 0; j < boardCheckerCount; j++) {
				var child = document.createElement('div');
				this.grid[i][j] = this.location.appendChild(child);
				this.grid[i][j].style.width = individualWidth - 0 + "px";
				this.grid[i][j].style.height = individualHeight - 0 + "px";
				this.grid[i][j].style.backgroundColor  = startColor;
				this.grid[i][j].originalColor = startColor;

				startColor = this._flipColor(startColor, opt1, opt2);
				this.grid[i][j].setAttribute("class", "boardPiece");
				this.grid[i][j].addEventListener("click", evt => this.getMove(evt));
				this.grid[i][j].myParam = [i, j];
				this.grid[i][j].highlighted == false;

			}
			startColor = this._flipColor(startColor, opt1, opt2);
		}
	}

	_flipColor(color, opt1, opt2){
		return ((color == opt1) ? opt2: opt1);
	}

	renderInitialPieces(){
		var color = PieceEnum.black;
		for (var row = 0; row < this.grid.length; row ++) {
			for (var column = 0; column < this.grid[row].length; column ++)
			{
				if (row >= 3 && row <= 4 && column >= 3 && column <= 4) {
					//Set an initial direction for the piece to move 1 to go down, -1 to go up
					let piece = new ReversiPiece(color, this.grid[row][column]);
					this.pieces[row][column] = piece;
					color = this._flipColor(color, PieceEnum.black, PieceEnum.white);
				} else {
					this.pieces[row][column] = null;
				}
			}
			color = this._flipColor(color, PieceEnum.black, PieceEnum.white);
		}
	}
}

class ReversiPiece {
	constructor(type, location) {
		if (type == PieceEnum.black){
			this.color = PieceColors[PieceEnum.black];
			this.otherColor = PieceColors[PieceEnum.white];
		} else if (type == PieceEnum.white){
			this.color = PieceColors[PieceEnum.white];
			this.otherColor = PieceColors[PieceEnum.black];
		} else {
			this.color = "linear-gradient(135deg, " + PieceColors[PieceEnum.white] +" 50%, " + PieceColors[PieceEnum.black] + " 50%)";
			this.otherColor = PieceColors[PieceEnum.black];
		}

		this.type = type;
		this.location = location; //Location is the div it sits on, null if we dont need to draw

		this.renderPiece(); //Only renders of location is valid

	}

	setText(text) {
		this.piece.innerHTML = text;
	}

	renderPiece(){
		if (this.location != null) {
			var child = document.createElement('div');
			this.piece = this.location.appendChild(child);
			this.piece.setAttribute("class", "piece");
			this.piece.style.backgroundColor  = this.color;
			this.piece.style.borderColor  = this.otherColor;
			if (this.type == null) {
				this.piece.style.background  = this.color;
				this.piece.style.borderImage  = this.otherColor;
			}
		}
	}

	deRenderPiece(){
		if (this.location != null && this.location.hasChildNodes()) {
			this.location.removeChild(this.location.childNodes[0]);
		}
	}

	setLocation(loca) {
		this.deRenderPiece();
		this.location = loca;
		this.renderPiece();
	}

	flip(){
		if (this.type == PieceEnum.white){
			this.color = PieceColors[PieceEnum.black];
			this.otherColor = PieceColors[PieceEnum.white];
			this.type = PieceEnum.black;
		} else {
			this.color = PieceColors[PieceEnum.white];
			this.otherColor = PieceColors[PieceEnum.black];
			this.type = PieceEnum.white;
		}
		this.deRenderPiece();
		this.renderPiece();
	}


	setType(type){
		if (type == PieceEnum.white){
			this.color = PieceColors[PieceEnum.white];
			this.otherColor = PieceColors[PieceEnum.black];
			this.type = type;
		} else if (type == PieceEnum.black){
			this.color = PieceColors[PieceEnum.black];
			this.otherColor = PieceColors[PieceEnum.white];
			this.type = type;
		} else {
			this.color = "linear-gradient(135deg, " + PieceColors[PieceEnum.white] +" 50%, " + PieceColors[PieceEnum.black] + " 50%)";
			this.otherColor = PieceColors[PieceEnum.black];
			this.type = type;
		}

		this.deRenderPiece();
		this.renderPiece();
	}

	getType(){
		return this.type;
	}
}