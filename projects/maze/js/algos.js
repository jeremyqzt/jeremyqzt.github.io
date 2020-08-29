var discoveredKey = "discovered";
var previousKey = "previousKey";
var weightKey = "w";

function okayToRun(arr) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == null) {
			alert("Start or Stop Flags Missing! \nDouble left-click to mark start. \nDouble right-click to mark end!");
			return false;
		}
	}
	return true;
}

async function DFSearch(grid, cur, end, first){
	if (first){
		if (this.grid.actionInProgress()) {
			alert("DFS Cannot Run, the Grid is currently occupied");
			return;
		}

		if (!okayToRun([grid, cur, end])) {
			return;
		}

		this.grid.setAction(true);
		grid.cleanAllPass();
		grid.clearAllAttrib();
		grid.setAllNodeAttrib(discoveredKey, false);
	}
	//console.log(end);

	if (end.getAttrib(discoveredKey)){
		return;
	}

	var adjToStart = grid.getAdjacentPassages(cur.vert, cur.hor);
	cur.setAttrib(discoveredKey, true);
	cur.setColor("Gold");
	await new Promise(r => setTimeout(r, 10));
	for (var i = 0; i < adjToStart.length; i++) {
		if (!adjToStart[i].getAttrib(discoveredKey)) {
			adjToStart[i].setAttrib(discoveredKey, true);
			adjToStart[i].setAttrib(previousKey, cur);

			await DFSearch(grid, adjToStart[i], end, false);
		}
	}
	cur.setColor("LightCoral");
	if (first) {
		await drawPath(end, cur);
	}
	if (first){
		this.grid.setAction(false);
	}

}


async function BFSearch(grid, start, end){
	if (this.grid.actionInProgress()) {
		alert("BFS Cannot Run, the Grid is currently occupied");
		return;
	}
	if (!okayToRun([grid, start, end])) {
		return;
	}
	this.grid.setAction(true);

	grid.cleanAllPass();
	grid.clearAllAttrib();

	grid.setAllNodeAttrib(discoveredKey, false);
	var cur = start;
	var BFSQueue = grid.getAdjacentPassages(cur.vert, cur.hor);
	var nextInLine = null;
	cur.setAttrib(discoveredKey, true);
	cur.setColor("Gold");
	for (var i = 0; i< BFSQueue.length; i++) {
		BFSQueue[i].setAttrib(previousKey, cur);
	}

	await new Promise(r => setTimeout(r, 10));
	while (BFSQueue.length != 0){
		cur = BFSQueue.shift();
		cur.setColor("Gold");
		nextInLine = grid.getAdjacentPassages(cur.vert, cur.hor);
		for (var i = 0; i< nextInLine.length; i++) {
			if (nextInLine[i].getAttrib(previousKey) == null) {
				nextInLine[i].setAttrib(previousKey, cur);
			}
		}
		if (!cur.getAttrib(discoveredKey)) {
			cur.setAttrib(discoveredKey, true);
			if (cur == end) {
				break;
			}

			BFSQueue = BFSQueue.concat(nextInLine);
			await new Promise(r => setTimeout(r, 10));
		}
	}
	await drawPath(end, start);

	this.grid.setAction(false);
}

async function BellmanFord(grid, start, end) {
	if (this.grid.actionInProgress()) {
		alert("Bellman-Ford Cannot Run, the Grid is currently occupied");
		return;
	}
	if (!okayToRun([grid, start, end])) {
		return;
	}
	this.grid.setAction(true);
	grid.cleanAllPass();
	grid.clearAllAttrib();

	grid.setAllNodeAttrib(discoveredKey, false);
	grid.setAllNodeAttrib(weightKey, Infinity);
	grid.setAllNodeAttrib(previousKey, null);
	var cycleMin = Infinity;
	var minPrev = null;
	start.setAttrib(weightKey, 0);

	var totalLoop = grid.countVerticies();
	for (var i = 0; i < totalLoop + 1; i++) {
		for (var j = 0; j < grid.grid.length; j++) {
			for (var t = 0; t < grid.grid[j].length; t++) {
				if (grid.grid[j][t].isObs) {
					continue;
				}
				grid.grid[j][t].setColor("Gold");
				var toProcess = grid.getAdjacentPassages(grid.grid[j][t].vert, grid.grid[j][t].hor);
				cycleMin = Infinity;
				minPrev = null;
				for (var z = 0; z < toProcess.length; z++) {
					toProcess[z].setColor("LightCoral");
					if (i % 250 === 0){
						await new Promise(r => setTimeout(r, 1));
					}
					if (toProcess[z].getAttrib(weightKey) != Infinity) {
						if (toProcess[z].getAttrib(weightKey) < cycleMin) {
							cycleMin = toProcess[z].getAttrib(weightKey);
							minPrev = toProcess[z];
						}
					}
					toProcess[z].setColor("white");
				}
				if (cycleMin < grid.grid[j][t].getAttrib(weightKey)) {
					grid.grid[j][t].setAttrib(previousKey, minPrev);
					grid.grid[j][t].setAttrib(weightKey, cycleMin + 1);
				}
				grid.grid[j][t].setColor("white");
			}
		}
	}

	await drawPath(end, start);

	this.grid.setAction(false);
}


async function Dijkstra(grid, start, end){
	if (this.grid.actionInProgress()) {
		alert("Dijkstra Cannot Run, the Grid is currently occupied");
		return;
	}
	if (!okayToRun([grid, start, end])) {
		return;
	}
	this.grid.setAction(true);
	grid.cleanAllPass();
	grid.clearAllAttrib();

	grid.setAllNodeAttrib(discoveredKey, false);
	grid.setAllNodeAttrib(weightKey, Infinity);

	var cur = start;
	var DijkstraQueue = grid.getAdjacentPassages(cur.vert, cur.hor);
	var nextInLine = null;
	cur.setAttrib(weightKey, 1);
	cur.setColor("Gold");
	for (var i = 0; i< DijkstraQueue.length; i++) {
		DijkstraQueue[i].setAttrib(weightKey, cur.getAttrib(weightKey) + 1);
		DijkstraQueue[i].setAttrib(previousKey, cur);
	}

	cur.setAttrib(discoveredKey, true);

	await new Promise(r => setTimeout(r, 10));
	while (DijkstraQueue.length != 0){
		cur = DijkstraQueue.shift();
		cur.setColor("Gold");
		nextInLine = grid.getAdjacentPassages(cur.vert, cur.hor);
		var toConsiderNext = [];
		for (var i = 0; i< nextInLine.length; i++) {
			if ((nextInLine[i].getAttrib(weightKey) > cur.getAttrib(weightKey) + 1) && ! nextInLine[i].getAttrib(discoveredKey)) {
				nextInLine[i].setAttrib(weightKey, cur.getAttrib(weightKey) + 1);
				nextInLine[i].setAttrib(previousKey, cur);
				toConsiderNext.push(nextInLine[i]);
			}
		}

		cur.setAttrib(discoveredKey, true);

		if (cur == end) {
			break;
		}

		DijkstraQueue = DijkstraQueue.concat(toConsiderNext);
		await new Promise(r => setTimeout(r, 10));

	}
	await drawPath(end, start);

	this.grid.setAction(false);
}

async function drawPath(end, first){
	var cur = end;
	if (cur.getAttrib(previousKey) == null) {
		alert("No Path Found");
		return
	}
	while (!cur.isStart) {
		cur.setColor("YellowGreen");
		cur = cur.getAttrib(previousKey);
		await new Promise(r => setTimeout(r, 10));
	}
}