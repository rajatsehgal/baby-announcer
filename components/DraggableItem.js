const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  display: block;
  touch-action: none;
  user-select: none;
  align-self: center;
  justify-self: center;
  z-index: 1;
  padding: 10px;
  white-space: nowrap;
}

:host([hidden]) {
  display: none;
}
</style>
<slot contenteditable>
`;

export default class DraggableItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.contentEditable = 'true';
  }
}

window.customElements.define('draggable-item', DraggableItem);
