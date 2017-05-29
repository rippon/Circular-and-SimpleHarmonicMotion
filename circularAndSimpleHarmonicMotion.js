/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var context;
var myCanvas;
var myCanvasWidth;
var myCanvasHeight;
var numberOf_gridLinesAcross;
var numberOf_gridLinesDown;
var myCanvas_xMarks; // ruler marks for the myCanvas
var myCanvas_yMarks; // ruler marks for the myCanvas
var myCanvas_xMarks_interval;
var myCanvas_yMarks_interval;
var timeCounter;
var angle;
var angleIncrement;
var myCircle;
var blobTrail;
var blobTrail_incrementalShift;

//Using clearInterval() to stop time in the previous example:

var myVar = setInterval(function(){ myTimer(); }, 1000);
function myTimer() {
    var d = new Date();
    var t = d.toLocaleTimeString();
    document.getElementById("demo").innerHTML = t;
}

function myStopFunction() {
    clearInterval(myVar);
}

function doStuff(){
    var myVar = setInterval(function(){ go_circularAndSimpleHarmonicMotion(); }, 50);
    function go_circularAndSimpleHarmonicMotion() {
        //alert("hallo from go_circularAndSimpleHarmonicMotion()");
        timeCounter++;
        clearMyCanvas();
        setGrid();
        context.strokeStyle = "black";
        var myBlob = new Blob(myCircle.centre, myCircle.radius/15, "red");
        myCircle.draw(context);
        myBlob.draw();
        var circumferencePoint = new CanvasPoint(myCircle.centre.x - myCircle.radius*Math.sin(angle),
                                                 myCircle.centre.y + myCircle.radius*Math.cos(angle));
        var radiusPoint = new CanvasPoint(myCircle.centre.x,
                                          myCircle.centre.y + myCircle.radius*Math.cos(angle));
        blobTrail.push(new Blob(new CanvasPoint(radiusPoint.x - (timeCounter/8)*blobTrail_incrementalShift, radiusPoint.y),
                                myCircle.radius/100, "black")
                      );
        for (var i=0; i < blobTrail.length; i++){
            blobTrail[i].
                setPosition(new CanvasPoint(blobTrail[i].position.x + 5*blobTrail_incrementalShift, blobTrail[i].position.y));
        }
        for (var i=0; i < blobTrail.length; i++){
            blobTrail[i].draw();
        }
        context.strokeStyle = "blue";
        drawLinePointToPoint(myCircle.centre, circumferencePoint);
        myBlob.setPosition(circumferencePoint);
        myBlob.setColour("blue");
        myBlob.draw();
        drawLinePointToPoint(circumferencePoint, radiusPoint);
        myBlob.setPosition(radiusPoint);
        myBlob.setColour("green");
        myBlob.draw();
        context.strokeStyle = "green";
        drawLinePointToPoint(radiusPoint, myCircle.centre);
        angle = angle + angleIncrement;
    }
}

function stop_circularAndSimpleHarmonicMotion(){
    alert("hallo from stop_circularAndSimpleHarmonicMotion()");
}

function setGrid(){
    context.strokeStyle = "BurlyWood";
    myCanvas_xMarks = []; // these are points with two coords (x,y), where y goes down
    for (i=0; i < numberOf_gridLinesDown; i++){
        myCanvas_xMarks.push( new CanvasPoint(i*(myCanvas.width / numberOf_gridLinesDown), 0) );
        drawLinePointToPoint(myCanvas_xMarks[i], new CanvasPoint(myCanvas_xMarks[i].x, myCanvas.height));
    }
    myCanvas_yMarks = []; // these are points with two coords (x,y), where y goes down
    for (i=0; i < numberOf_gridLinesAcross; i++){
        myCanvas_yMarks.push( new CanvasPoint(0, i*(myCanvas.height / numberOf_gridLinesAcross)) );
        drawLinePointToPoint(myCanvas_yMarks[i], new CanvasPoint(myCanvas.width, myCanvas_yMarks[i].y));
    }
}

function initialise_myCircularAndSimpleHarmonicMotionWork(){
    //alert("hallo from initialise_myCircularAndSimpleHarmonicMotionWork()");
    context = document.getElementById("myCanvas").getContext("2d");
    myCanvas = this.document.getElementById("myCanvas");
    myCanvasWidth = myCanvas.getAttribute("width");
    myCanvasHeight = myCanvas.getAttribute("height");
    numberOf_gridLinesAcross = 10;
    numberOf_gridLinesDown = 6;
    myCanvas_xMarks = []; // ruler marks for the myCanvas
    myCanvas_yMarks = []; // ruler marks for the myCanvas
    myCanvas_xMarks_interval = myCanvas.width / numberOf_gridLinesAcross;
    myCanvas_yMarks_interval = myCanvas.height / numberOf_gridLinesDown;
    myCircle = new Circle(new CanvasPoint(myCanvasWidth/2, myCanvasHeight/2), myCanvasWidth/3);
    angle = 0;
    angleIncrement = Math.PI/100;
    setGrid();
    blobTrail = [];
    blobTrail_incrementalShift = myCanvasWidth/3000;
    timeCounter = 0;
}

function setAngle(toThis){ angle = toThis; }
function setAngleIncrement(toThis){ angleIncrement = toThis; }

