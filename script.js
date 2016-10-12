$(function() {
	var canvas = document.getElementById("c");
	var ctx = canvas.getContext("2d");

/***************************************************/

	var isDrawing = false;
	var undo = [];
	var redo = [];
	var shapes = [];
	var currentTool = undefined;

	var color = "black";

/***************************************************/
	var minRad = 1,
	maxRad = 100,
	defaultRad = 1,
	interval = 5,
	radSpan = document.getElementById('radval');

/***************************************************/

// Colors

	$("#yellow").on("click", function() {
		color = "#FFF700";
		console.log("Selecting yellow!");

	})
	$("#red").on("click", function() {
		color = "#FF6961";
		console.log("Selecting red!");
	})
	$("#pink").on("click", function() {
		color = "#ff7bac";
		console.log("Selecting pink!");

	})
	$("#green").on("click", function() {
		color = "#77DD77";
		console.log("Selecting green!");

	})
	$("#blue").on("click", function() {
		color = "#00d0f3";
		console.log("Selecting blue!");

	})
	$("#white").on("click", function() {
		color = "white";
		console.log("Selecting white!");

	})
	$("#black").on("click", function() {
		color = "black";
		console.log("Selecting black!");
	})
	$("#violet").on("click", function() {
		color = "#B19CD9";
		console.log("Selecting violet!");
	})
	$("#orange").on("click", function() {
		color = "#FFB347";
		console.log("Selecting orange!");
	})

/***************************************************/

// Tools 
	var currentToolType = 0;

	$("#penTool").on("click", function() {
		currentToolType = 0;
		console.log("Selecting pen tool!");
	})

	$("#rectangleTool").on("click", function() {
		currentToolType = 1;
		console.log("Selecting rectangle tool!");
	})
	$("#circleTool").on("click", function() {
		currentToolType = 2;
		console.log("Selecting circle tool!");
	})
	$("#lineTool").on("click", function() {
		currentToolType = 3;
		console.log("Selecting line tool!");
	})
	$("#triangleTool").on("click", function() {
		currentToolType = 4;
		console.log("Selecting triangle tool!");
	})
	$('#textTool').on("click", function(){
		currentToolType = 5;
		console.log("Selecting text tool!");
	})	

/***************************************************/

	function createNewTool() {
		if(currentToolType === 0) {
			return new Pen(defaultRad, color);
		}
		else if(currentToolType === 1) {
			return new Rectangle(defaultRad, color);
		}
		else if(currentToolType === 2){
			return new Circle(defaultRad, color);
		}
		else if(currentToolType === 3){
			return new Line(defaultRad, color);
		}
		else if(currentToolType === 4){
			return new Triangle(defaultRad, color);
		}
		else if(currentToolType === 5){
			return new Text(color);
		}
	}

/***************************************************/
/*
	Tilraun til þess að downloada mynd. 
	Fann þennan kóða og ákvað að reyna að skella honum saman
	en hann virkar ekki, því miður. Eftir margar tilraunir og
	ýmsar betrumbætur, sem voru kannski ekki betrumbætur.
	Ákvað bara að hafa þetta með til þess að vera með
	einhverja virkni á Save takkanum okkar, þó það sé bara
	að skrifa á console-inn.
*/
	function downloadCanvas(link, canvasId, filename) {
    	link.href = document.getElementById(canvasId).toDataURL();
    	link.download = filename;
    	console.log("Downloading the canvas");
	}
	document.getElementById('saveTool').addEventListener('click', function() {
    	downloadCanvas(this, 'c', 'test.png'); 
	}, false);


/***************************************************/
	
	canvas.onmousedown = function(e) {
		currentTool = createNewTool();
	
		isDrawing = true;
		
		var x = e.clientX - this.offsetLeft;
		var y = e.clientY - this.offsetTop;
		
		var point = new Point(x, y);
		currentTool.addPoint(point);
	}
	
	canvas.onmousemove = function(e) {
		if(isDrawing) {
			var x = e.clientX - this.offsetLeft;
			var y = e.clientY - this.offsetTop;
			
			var point = new Point(x, y);
			currentTool.addPoint(point);
		
			clearWindow();
			drawShapes();
			currentTool.draw(ctx, defaultRad, color);
		}
	}
	
	canvas.onmouseup = function(e) {
		isDrawing = false;
		shapes.push(currentTool);
		
		console.log(shapes);
	}

/***************************************************/
	
	function clearWindow() {
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.beginPath();
	}

/***************************************************/
	
	function drawShapes() {
		for(var i = 0; i < shapes.length; ++i) {
			shapes[i].draw(ctx);
		}
	}

/***************************************************/
/*
	setRadius er fall sem gefur defaultRad nýju stærðina
	sína, passa upp á að burstastærðin fari aldrei yfir
	minRad sem er = 0.5 eða í meira en maxRad sem er 100 px
	radSpan.innerHTML er til þess að sýna hver stræðin er
*/
	function setRadius(newRadius){
		if(newRadius < minRad){
			newRadius = minRad;
		}
		else if(newRadius > maxRad){
			newRadius = maxRad;
		}
		defaultRad = newRadius;
		radSpan.innerHTML = defaultRad;
		console.log("Setting defaultRad to " + defaultRad);
	}

/***************************************************/
/*
	decrad er mínustákn sem táknar það að minna bursta stærðina
	, frumstilltum defaultRad sem 1 og interval sem 5, svo í
	hvert sinn sem við minnkum eða stækkum stærðina á bursatnum
	hækkar það um 5 pixla eða minnkar

*/
	$("#decrad").on("click", function() {
		setRadius(defaultRad-interval);
		console.log("Selecting decreased linewidth");
	});

	$("#incrad").on("click", function() {
		setRadius(defaultRad+interval);
		console.log("Selecting increased linewidth");
	});

/***************************************************/

	$("#undo").on("click", function(e) {
		shapes.pop();	
		clearWindow();
		drawShapes();
	});

	/*
	$("#redo").on("click", function(e) {
		shapes.push();	
		clearWindow();
		drawShapes();
	});
	*/

	$("#clearButton").on("click", function(e) {
		clearWindow();
	});
	
	$("#drawShapes").on("click", function(e) {
		drawShapes();
	});

/***************************************************/
});