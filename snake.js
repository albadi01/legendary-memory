// Code goes here

window.onload = function() {
  var canvasWidth = 900;
  var canvasHeight = 600;
  var blockSize = 30;
  var ctx;
  var delay = 1000;
  var snakee;

  init();

  function init() {
    var canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "1px solid";
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    snakee = new Snake([
      [6, 4],
      [5, 4],
      [4, 4]
    ], "right");
    refreshCanvas();
  }

  function refreshCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    snakee.advance();
    snakee.draw();
    setTimeout(refreshCanvas, delay);

  }

  function drawBlock(ctx, position) //desine le cotexte et la position d'un bloc
  {
    var x = position[0] * blockSize;
    var y = position[1] * blockSize;
    ctx.fillRect(x, y, blockSize, blockSize); //dessine un rectangle sur la position
  }

  function Snake(body, direction) //prototype de la fonction snake
  {
    this.body = body;
    this.direction = "right";
    this.draw = function() {
      ctx.save();
      ctx.fillStyle = "#ff0000";
      for (var i = 0; i < this.body.length; i++) {
        drawBlock(ctx, this.body[i]); //dessine le bloc il y'a trois
      }
      ctx.restore(); //permetde dessiner le contexte comme il etait avant
    }
    this.advance = function() {
      var nextPosition = this.body[0].slice();
      switch (this.direction) {
        case "left":
          nextPosition[0] -= 1;
          break;
        case "right":
          nextPosition[0] += 1;
          break;
        case "down":
          nextPosition[1] += 1;
          break;
        case "up":
          nextPosition[1] -= 1;
          break;
        default:
          throw ("invadlid direction");
      }
      this.body.unshift(nextPosition); //unshift permet de rajouter next position à la premiere place
      this.body.pop(); //enleve  le dernier element
    };
    this.setDirection = function(newDirection) {
      var allowedDirections;
      switch (this.direction) {
        case "left":
        case "right":
          allowedDirections = ["up", "down"];
          break;
        case "down":
        case "up":
          allowedDirections = ["left", "right"];
          break;
        default:
          throw ("invalid direction");
      }
      if (allowedDirections.indexOf(newDirection) > -1) {
        this.direction = newDirection;
      }
    };
  }
  document.onkeydown = function handleKeyDown(e) {
    var key = e.keyCode;
    var newDirection;
    switch (key) {
      case 123:
        newDirection = "left";
        break;
      case 126:
        newDirection = "up";
        break;
      case 124:
        newDirection = "right";
        break;
      case 125:
        newDirection = "down";
        break;
      default:
        return;

    }
    snakee.setDirection(newDirection);
  };
}
