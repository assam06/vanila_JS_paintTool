const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
//3. 세이브 버튼 선언
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

/*1. cavas배경색이 지정이 안돼서 저장하면 투명으로 나올거야.
canvas 색을 지정해주자. 배경색은 default에 의해서 하얀색이 되는것임*/
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = "INITIAL_COLOR";
ctx.fillStyle = "INITIAL_COLOR";
ctx.lineWidth = 2.5;

let painting = false;
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
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

//2-2 우클릭시 창뜨는거 막는듯?
function handleCM(event) {
  event.preventDefault();
}

//4. save 함수 지정
function handleSaveClick() {
  /*4-2 이미지를 포함한 data URL을 반환하는 메소드?
  + image 포멧을 jpeg로 바꿔주는거 같은데..? 기본은 png */
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  //5-2 JS에서 각각의 attribute를 쓰려면 규칙이 있나봐.
  /*여기서 href는 image가 되어야해. download는 그 이름을 가져야 하고. https://developer.mozilla.org/ko/docs/Web/HTML/Element/a 참고 */

  link.download = "PaintJS[🎨]";
  link.click();
  /*5. download는 'a'(anchor)태그의 attribute. download는 browser에게 다운로드하라고 명령함. 거기 가라는게 아니라
   */
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  //2-1
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((potato) =>
  potato.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
