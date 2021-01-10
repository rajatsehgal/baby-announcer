import '../components/ToggleSwitch.js';
import '../components/DraggableContainer.js';
import '../components/DraggableItem.js';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  display: grid;
  width: 100%;
  height: 100%;
  touch-action: none;
  grid-template-columns: 1fr 62px;
  grid-template-rows: 64px;
}

:host([hidden]) {
  display: none;
}

div {
  align-self: center;
  justify-self: center;
  text-align: center;
}

img {
  grid-row: 2;
  grid-column: 1/3;
  align-self: center;
  justify-self: center;
  width: 100%;
}

draggable-container {
  grid-row: 2;
  grid-column: 1/3;
  font-weight: bold;
}

#name {
  font-size: 32px;
}
</style>
<div><span>Edit and drag the text below,</span><br><span>take a screenshot, crop and share...</span></div>
<toggle-switch></toggle-switch>
<img draggable="false" />
<draggable-container>
  <draggable-item id="name">Anya Sehgal</draggable-item>
  <draggable-item>born</draggable-item>
  <draggable-item>22nd Jan 2021</draggable-item>
  <draggable-item>10:30 AM</draggable-item>
  <draggable-item>7 lbs. 11 oz.</draggable-item>
  <draggable-item>21 inches</draggable-item>
</draggable-container>
`;

export default class EditPhoto extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  set image(value) {
    this.shadowRoot.querySelector('img').setAttribute('src', value);
  }
}

window.customElements.define('edit-photo', EditPhoto);
