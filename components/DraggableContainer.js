const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

:host([hidden]) {
  display: none;
}
</style>
<slot>
`;

let active = false;
let dragItem = null;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

export default class DraggableContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._changeListener = ((e) => {
      this.dispatchEvent(
        new CustomEvent("toggle", {
          detail: {
            value: e.target.checked
          },
          bubbles: true
        })
      );
    });
  }

  connectedCallback() {
    this.addEventListener('touchstart', dragStart, false);
    this.addEventListener('mousedown', dragStart, false);

    this.addEventListener('touchend', dragEnd, false);
    this.addEventListener('mouseup', dragEnd, false);

    this.addEventListener('touchmove', drag, false);
    this.addEventListener('mousemove', drag, false);
  }

  disconnectedCallback() {
    this.removeEventListener('touchstart', dragStart, false);
    this.removeEventListener('mousedown', dragStart, false);

    this.removeEventListener('touchend', dragEnd, false);
    this.removeEventListener('mouseup', dragEnd, false);
    
    this.removeEventListener('touchmove', drag, false);
    this.removeEventListener('mousemove', drag, false);
  }
}

function dragStart(e) {
  if (e.target.nodeName === 'DRAGGABLE-ITEM') {
    dragItem = e.target;

    const xPos = parseFloat(dragItem.getAttribute('data-xpos'));
    const yPos = parseFloat(dragItem.getAttribute('data-ypos'));
    xOffset = xPos ? xPos : 0;
    yOffset = yPos ? yPos : 0;

    if (e.type === 'touchstart') {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    } else {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }

    active = true;
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;
  dragItem.setAttribute('data-xpos', xOffset);
  dragItem.setAttribute('data-ypos', yOffset);

  dragItem = null;
  active = false;
}

function drag(e) {
  if (active && dragItem) {

    e.preventDefault();

    if (e.type === 'touchmove') {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, dragItem);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)';
}

window.customElements.define('draggable-container', DraggableContainer);
