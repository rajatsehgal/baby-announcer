let container = document.querySelector("#container");

let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("mousedown", dragStart, false);

container.addEventListener("touchend", dragEnd, false);
container.addEventListener("mouseup", dragEnd, false);

container.addEventListener("touchmove", drag, false);
container.addEventListener("mousemove", drag, false);


function dragStart(e) {
  const xPos = parseFloat(e.target.getAttribute("data-xpos"));
  const yPos = parseFloat(e.target.getAttribute("data-ypos"));
  xOffset = xPos ? xPos : 0;
  yOffset = yPos ? yPos : 0;

  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }

  if (e.target.classList.contains("draggable")) {
    active = true;
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;
  e.target.setAttribute("data-xpos", xOffset);
  e.target.setAttribute("data-ypos", yOffset);

  active = false;
}

function drag(e) {
  if (active) {

    e.preventDefault();

    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, e.target);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

const upload = document.getElementById('upload');
const image = document.getElementById('image');
upload.addEventListener('change', (e) => {
  const files = e.target.files;
  if (files && files[0]) {
    let reader = new FileReader();

    reader.onload = function (evt) {
      image.setAttribute('src', evt.target.result);
    };

    reader.readAsDataURL(files[0]);
  }
});