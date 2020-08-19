const canvas = document.getElementById("jsCanvas");

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
}

function onMouseDown(event) {
  console.log();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  // mousedown은 클릭했을때 발생하는 이벤트
}
