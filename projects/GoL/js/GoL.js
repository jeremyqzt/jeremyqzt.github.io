var singleCol = "<div id='space' class='col-sm-1 bubbleBorder text-center'></div>";
var singleRow = "<div class = 'row'>";
var completeRow = singleRow + singleCol.repeat(12) + "</div>";
var possibleEmojis = ["😃", "😄", "🙂", "😉", "😛", "🤪", "😔", "😪", "😎", "😠"];
$("#lifeGrid").html(completeRow.repeat(12));

$("#lifeGrid").on( "click","#space", function() {
	if($.trim($(this).html()) == "") {
		$(this).html(possibleEmojis[Math.floor(Math.random()*possibleEmojis.length)]);
	} else {
		$(this).empty();
	}
});

class GoL {
	constructor(gridId) {
		this.GID = gridId;
		this.lifeGrid = new lifeGrid(gridId);
		this.stop = false;
	}

	stopEvolving() {
		this.stop = true;
	}

	evolveSingle(){
		this.lifeGrid.readGrid(this.GID);
		var grid = this.lifeGrid.getGrid();
		var newGrid = [];
		for (var i = 0; i < grid.length; i++) {
			newGrid.push([]);
			for (var t = 0; t < grid[i].length; t++) {
				//console.log("Row : " + i + "Col: " + t);
				var alive = grid[i][t];
				var neighbours = this.lifeGrid.getNeighbours(i,t);
				newGrid[i][t] = this.liveOrDie(alive, neighbours);
			}
		}
		//console.log(newGrid);
		this.lifeGrid.renderNew(newGrid);
	}

	allDead() {
		var grid = this.lifeGrid.getGrid();
		for (var i = 0; i < grid.length; i++) {
			for (var t = 0; t < grid[i].length; t++) {
				if(grid[i][t]) {
					return false;
				}
			}
		}
		return true;
	}

	removeAllPop(){
		this.lifeGrid.wipe();
		this.stop = true;
	}

	randomPop() {
		this.lifeGrid.randomGrid();
	}

	liveOrDie(alive, neighbCount) {
		var lives = true;
		if (alive) {
			if (neighbCount < 2 || neighbCount > 3) {
				lives = false;
			}
		} else {
			if (neighbCount != 3){
				lives = false;
			}
		}
		return lives;
	}

	async evolveContinous(){
		var count = 0;
		this.stop = false;
		while (1) {
			this.evolveSingle();
			await new Promise(r => setTimeout(r, 1000));
			if (this.stop || this.allDead()){
				alert("Simulation Complete!");
				break;
			}
		}
	}
}

class lifeGrid{
	constructor(gridId){
		this.GID = gridId;
		this.grid = [];
		this.readGrid(gridId);
	}

	readGrid(gridId) {
		var row = [];
		var grid = [];
		var rowCount = 0;
		var colCount = 0;
		$( gridId + " .row" ).each(function(index, obj) {
			row = [];
			rowCount = 0;
			$(this).children("#space").each(function(index, obj){
				if(obj.innerHTML == "" || obj.innerHTML == "☠️") {
					row.push(false);
				} else {
					row.push(true);
				}
				rowCount++;
			});
			colCount++;
			grid.push(row);
		});
		this.copyGrid(grid);
		this.row = rowCount;
		this.col = colCount;
	}

	getSingleNeighbour(i, j){
		if (i >=0 && i < this.row) {
			if (j >=0 && j < this.col){
				return this.grid[i][j];
			}
		}
		return false;
	}

	getNeighbours(i, j) {
		var ret = 0;
		for (var row = (i - 1); row <=  (i + 1); row++){
			for (var col = (j - 1); col <=  (j + 1); col++){
				//console.log("Row: " + row + "Col: " + col);
				if (row == i && col == j){
					continue;
				}
				ret += (this.getSingleNeighbour(row, col)) ? 1: 0;
			}
		}
		return ret;
	}

	getGrid() {
		return this.grid;
	}

	wipe(){
		var newGrid = []
		for (var i = 0; i < this.grid.length; i++) {
			newGrid.push([]);
			for (var t = 0; t < this.grid[i].length; t++) {
				newGrid[i][t] = false;
			}
		}
		//overwrite both copies so no skulls appear
		this.copyGrid(newGrid);
		this.renderNew(newGrid);
	}

	randomGrid(){
		var newGrid = []
		for (var i = 0; i < this.grid.length; i++) {
			newGrid.push([]);
			for (var t = 0; t < this.grid[i].length; t++) {
				newGrid[i][t] = true;
				if(3 < Math.floor(Math.random()*10)){
					newGrid[i][t] = false;
				}
			}
		}
		this.renderNew(newGrid);
	}

	renderNew(newGrid){
		var i = 0;
		var j = 0;
		var grid = newGrid;
		var oldGrid = this.grid;

		$( this.GID + " .row" ).each(function(index, obj) {
			j = 0;
			$(this).children("#space").each(function(index, obj){
				if (grid[i][j] == true){
					obj.innerHTML = possibleEmojis[Math.floor(Math.random()*possibleEmojis.length)]
				} else {
					obj.innerHTML = "";
					if (oldGrid[i][j] == true) {
						obj.innerHTML = "☠️";
					}
				}
				j++;
			});
			i++;
		});
		this.copyGrid(newGrid);
	}

	copyGrid(grid){
		this.grid = [];
		for (var i = 0; i < grid.length; i++) {
			this.grid.push([]);
			for (var t = 0; t < grid[i].length; t++) {
				this.grid[i][t] = grid[i][t];
			}
		}
	}
}
