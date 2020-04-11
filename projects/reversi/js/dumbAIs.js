class GreedyAI {
	static getGreedyMove(moves, flips) {
		var best = 0;
		var retIdx = -1;
		for (var i = 0; i < moves.length; i++) {
			if (flips[i].length > best) {
				best = flips[i].length;
				retIdx = i;
			}
		}

		return moves[retIdx];
	}
}

class RandomAI {
	static getRandomMove(moves) {
		var idx = Math.floor(Math.random() * moves.length);
		return moves[idx];
	}
}