class MinMaxAlgo {
	static getMinMaxMove(gameSituation, depth, turn) {
		var curGame = new Reversi(null, null, gameSituation, turn);
		var avail = curGame.avail;
		var gameCpy = null;
		var maxOrMin = 64;
	
		if(turn == PieceEnum.black) {
			maxOrMin = -64;
		}
		var nextFavour = 0;
		var MoveIdx = 0;
		var nextState = null;

		var moveScores = [];

		if (depth > 0) {
			for (var i = 0; (i < avail.length) && (avail.length > 0); i++) {
				//console.log(avail);
				gameCpy = curGame.board.getStrippedPieces(); //Arrays are mutable and passed as reference, must rebuild
				//console.log(gameCpy);
				nextState = new Reversi(null, null, gameCpy, turn);
				nextState.board.makeMove(nextState.avail[i][0], nextState.avail[i][1], turn);
				nextState.board.flipPieces(nextState.wouldBeFlippedPieces[i]);
				nextFavour = MinMaxAlgo.getMinMaxMove(nextState.board.getStrippedPieces(), (depth - 1), nextState.getflipTurn())[0];
				if (turn == PieceEnum.white && nextFavour < maxOrMin) {
					maxOrMin = nextFavour;
					MoveIdx = i;
				} else if (turn == PieceEnum.black && nextFavour > maxOrMin) {
					maxOrMin = nextFavour;
					MoveIdx = i;
				}
				//console.log("Starting Next Cycle of: " + depth);
				moveScores[i] = nextFavour;
			}
		} else {
			//console.log("Depth: " + depth + " Returning: " + MinMaxAlgo.computeBoardGoodness(gameSituation));
			return [MinMaxAlgo.computeBoardGoodness(gameSituation)];
		}

		//console.log("Depth: " + depth);
		//console.log(moveScores);
		//console.log("Depth: " + depth + " Returning: " + maxOrMin);
		return [maxOrMin, avail[MoveIdx]];
	}

	static computeBoardGoodness(board) {
		var favourability = 0
		//We take black as +ve and white as -ve in this calculation
		for (var i = 0; i < board.length; i++) {
			for (var j = 0; j < board[i].length; j++){
				if (board[i][j] == null) {
					continue;
				} else if (board[i][j].type == PieceEnum.white) {
					favourability--;
				} else {
					favourability++;
				}
			}
		}

		return favourability;
	}
}