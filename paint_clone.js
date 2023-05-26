const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let isDrawing = false;
let tool = "pen";
let color = "#000000";
let size = 5;

function startDrawing(e) {
  isDrawing = true;
  draw(e);
}

function stopDrawing() {
  isDrawing = false;
  context.beginPath();
}

function draw(e) {
  if (!isDrawing) return;

  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;

  switch (tool) {
    case "pen":
      drawPen(x, y);
      break;
    case "eraser":
      erase(x, y);
      break;
    case "line":
      drawLine(x, y);
      break;
    case "circle":
      drawCircle(x, y);
      break;
    case "square":
      drawSquare(x, y);
      break;
  }
}

function drawPen(x, y) {
  context.strokeStyle = color;
  context.lineWidth = size;
  context.lineCap = "round";
  context.lineTo(x, y);
  context.stroke();
  context.beginPath();
  context.moveTo(x, y);
}

function erase(x, y) {
  context.clearRect(x - size / 2, y - size / 2, size, size);
}

function drawLine(x, y) {
  context.strokeStyle = color;
  context.lineWidth = size;
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + 50, y + 50);
  context.stroke();
}

function drawCircle(x, y) {
  context.strokeStyle = color;
  context.lineWidth = size;
  const radius = 50;
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.stroke();
}

function drawSquare(x, y) {
    context.strokeStyle = color;
    context.lineWidth = size;
    const squareSize = size;
    const halfSize = squareSize / 2;
    context.beginPath();
    context.strokeRect(x - halfSize, y - halfSize, squareSize, squareSize);
  }

function setColor(selectedColor) {
  color = selectedColor;
}

function setTool(selectedTool) {
  tool = selectedTool;
}

function fillCanvas() {
  context.fillStyle = color;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function updateSize() {
  size = parseInt(document.getElementById("sizeInput").value);
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", function(e) {
  context.lineWidth = size + (e.clientX - canvas.offsetLeft) / 100;
});
