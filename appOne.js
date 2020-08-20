//1. canvas위에 마우스의 움직임을 감지했으면 좋겠어
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");

canvas.width = 700;
canvas.height = 700;

//5. ctx는 canvas의 픽셀을 다루는것.
ctx.strokeStyle = "#2c2c2c";

ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
  painting = false;
}

//6
function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  //6 만약 페인팅이 아니라면(마우스가 캔버스 위에 둥둥 떠다닐때)
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);

    //7. 페인팅이라면
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

//9. 클릭시 색상을 오버라이드 하게 할거야
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
}

//2 canvas가 있는걸 감지
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  // mousedown은 클릭했을때 발생하는 이벤트
  //3-2 근데 마우스를 떼면 다시 false가 되어야하지.
  canvas.addEventListener("mouseup", stopPainting);
  //4. 캔버스를 벗어나면 false가 되지.
  canvas.addEventListener("mouseleave", stopPainting);
}

// 8. array.from메소드는 obj로부터 array를 만듦
Array.from(colors).forEach((potato) =>
  potato.addEventListener("click", handleColorClick)
);
/* arrya를 만들고 forEach로 color를 돌려서 addEventListener("click", handleColorClick)를 호출하고*/
