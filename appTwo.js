const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
//1. range 선언
const range = document.getElementById("jsRange");
//4-1
const mode = document.getElementById("jsMode");

//7. 보통 반복이 들어가면 상수를 만듦.
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
//8
ctx.strokeStyle = "INITIAL_COLOR";
ctx.fillStyle = "INITIAL_COLOR";
ctx.lineWidth = 2.5;
let painting = false;
//5
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  //6. 클릭하면 strokeStyle과 fillStyle을 color값으로 설정해주는거야
  ctx.fillStyle = color;
}

//3. 사이즈 조절
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

//5. 버튼클릭시 안에 글씨 바뀜
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}
// 9. 근데 if없이 하면 Fill만 됨.
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach((potato) =>
  potato.addEventListener("click", handleColorClick)
);

//2. range는 아마 input에 반응할거야.
if (range) {
  range.addEventListener("input", handleRangeChange);
}

//4-2
if (mode) {
  mode.addEventListener("click", handleModeClick);
}
