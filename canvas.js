var ratio = 10;
var canvas = document.createElement('canvas');
canvas.id = "drawing";
canvas.width = canvasValuesWithRatio(ratio).width;
canvas.height = canvasValuesWithRatio(ratio).height;
var body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);
var ctx = canvas.getContext('2d');

var ball_x = canvas.width/2;
var ball_r = canvas.width/2 - 3;
var ball_y = canvas.height - ball_r;

function canvasValuesWithRatio(ratio) {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    if(windowWidth >= windowHeight) {
      var canvasHeight = windowHeight * 0.6;
      var canvasWidth = canvasHeight / ratio;
    } else {
      var canvasWidth = windowWidth * 0.11; //0.11
      var canvasHeight = canvasWidth * ratio;
    }
    return {
      width: canvasWidth,
      height: canvasHeight,
    };
  }