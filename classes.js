function Point(x, y) {
	this.x = x;
	this.y = y;
}

/******************************************/
/*

	Gef öllum elementum, nema texta, bæði defaultRad (sem
	er lineWidth) og color. 
	Nota beginPath() og closePath() til þess að afmarka
	hverja teikniaðgerð.

*/

function Pen(defaultRad, color) {
	this.points = [];
	this.defaultRad = defaultRad;
	this.color = color;
}
Pen.prototype.addPoint = function(p) {
	this.points.push(p);
}
Pen.prototype.draw = function(ctx, defaultRad, color) {
	ctx.beginPath();
	ctx.lineWidth = this.defaultRad;
	for(var i = 0; i < this.points.length; ++i) {
		var currentPoint = this.points[i];
		if(i == 0) {
			this.defaultRad;
			ctx.fillstyle = this.color;
			ctx.strokeStyle = this.color;
			ctx.moveTo(currentPoint.x, currentPoint.y);
		}
		else {
			this.defaultRad;
			ctx.fillstyle = this.color;
			ctx.strokeStyle = this.color;
			ctx.lineTo(currentPoint.x, currentPoint.y);
			ctx.stroke();
		}
	}
	ctx.closePath();
}

/******************************************/

function Rectangle(defaultRad, color) {
	this.start = undefined;
	this.end = undefined;
	this.defaultRad = defaultRad;
	this.color = color;
}
Rectangle.prototype.addPoint = function(p) {
	if(this.start === undefined) {
		this.start = p;
		console.log("Adding start point to rectangle");
	}
	else {
		this.end = p;
		console.log("Updating end point in rectangle");
	}		
}
Rectangle.prototype.draw = function(ctx, defaultRad, color) {
	var width = this.end.x - this.start.x;
	var height = this.end.y - this.start.y;
	ctx.beginPath();
	ctx.fillstyle = this.color;
	ctx.strokeStyle = this.color;
	ctx.lineWidth = this.defaultRad;
	ctx.rect(this.start.x,this.start.y,width, height);
	ctx.stroke();
	ctx.closePath();
}

/******************************************/

function Circle(defaultRad, color) {
	this.start = undefined;
	this.end = undefined;
	this.defaultRad = defaultRad;
	this.color = color;
}
Circle.prototype.addPoint = function(p) {
	if(this.start === undefined) {
		this.start = p;
		console.log("Adding start point to circle");
	}
	else {
		this.end = p;
		console.log("Updating end point in circle");
	}		
}
Circle.prototype.draw = function(ctx, defaultRad, color) {
	var radius = this.end.x - this.start.x;
	ctx.beginPath();
	ctx.lineWidth = this.defaultRad;
	ctx.fillstyle = this.color;
	ctx.strokeStyle = this.color;
	ctx.arc(this.start.x, this.start.y, Math.abs(radius), 0, Math.PI*2);
	ctx.stroke();
	ctx.closePath();
}

/******************************************/

function Line(defaultRad, color){
	this.start = undefined;
	this.end = undefined;
	this.defaultRad = defaultRad;
	this.color = color;
}
Line.prototype.addPoint = function(p){
	if(this.start === undefined){
		this.start = p;
		console.log("Adding start point to line")
	}
	else{
		this.end = p;
		console.log("Updating end point in line")
	}
}
Line.prototype.draw = function(ctx, defaultRad, color){
	var startingX = this.start.x;
	var startingY = this.start.y;
	var endingX = this.end.x;
	var endingY = this.end.y;
	ctx.lineWidth = this.defaultRad;

	ctx.beginPath();
	this.defaultRad;
	ctx.fillstyle = this.color;
	ctx.strokeStyle = this.color;
    ctx.moveTo(startingX, startingY);
    ctx.lineTo(endingX, endingY);
    ctx.stroke();
    ctx.closePath();
}


/******************************************/

function Triangle(defaultRad, color) {
	this.start = undefined;
	this.end = undefined;
	this.defaultRad = defaultRad;
	this.color = color;
}
Triangle.prototype.addPoint = function(p) {
	if(this.start === undefined) {
		this.start = p;
		console.log("Adding start point to triangle");
	}
	else{
		this.end = p;
		console.log("Updating start point in triangle");
	}
}
Triangle.prototype.draw = function(ctx, defaultRad, color) {
	ctx.lineWidth = this.defaultRad;
	ctx.beginPath();
	this.defaultRad;
	ctx.fillstyle = this.color;
	ctx.strokeStyle = this.color;
	ctx.moveTo(this.start.x, this.start.y);
	ctx.lineTo(this.end.x, this.end.y);
	ctx.lineTo(this.start.x, this.end.y);
	ctx.lineTo(this.start.x, this.start.y);
	ctx.stroke();
	ctx.closePath();
}


/******************************************/

/*
	Tilraun við texta, notaði sömu klasa- uppsetningu og hjá formunum, en það er náttúrulega ekki alveg
	rétt, svo ef þú ætlar að skrifa texta þá þarftu að skrifa hann
	í textaboxið sem er fyrir neðan canvasinn og draga svo músina
	á þann stað sem þú vilt að textinn birtist.
*/

function Text(color) {
	this.start = undefined;
	this.end = undefined;
	this.color = color;
}
Text.prototype.addPoint = function(p) {
	if(this.start === undefined) {
		this.start = p;
		console.log("Adding start point to circle");
	}
	else {
		this.end = p;
		console.log("Updating end point in circle");
	}
	
}
Text.prototype.draw = function(ctx, color) {
	
	ctx.beginPath();
	ctx.fillStyle = this.color;
 	ctx.font = "bold 36px Sans-serif";
  	ctx.fillText($("#words").val(), this.start.x, this.start.y);
  	ctx.closePath();
  	console.log("erum vid her");
}