const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  display: grid;
  height: 100%;
}

:host([hidden]) {
  display: none;
}

div {
  grid-row: 1;
  grid-column: 1;
  align-self: center;
  justify-self: center;
}

input {
  grid-row: 1;
  grid-column: 1;
  cursor: pointer;
  opacity: 0;
}
</style>
<div>Tap to choose a photo...</div>
<input type="file" accept="image/*" />
`;

export default class ChoosePhoto extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._changeListener = changeListener.bind(this);
  }

  connectedCallback() {
    this.shadowRoot.querySelector('input').addEventListener('change', this._changeListener);
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('input').removeEventListener('change', this._changeListener);
  }
}

function changeListener (e) {
  const files = e.target.files;
  if (files && files[0]) {
    let reader = new FileReader();

    reader.onload = ((evt) => {
      this.dispatchEvent(
        new CustomEvent("choose", {
          detail: {
            value: evt.target.result
          },
          bubbles: true,
          composed: true
        })
      );
    });

    reader.readAsDataURL(files[0]);
  }
}

window.customElements.define('choose-photo', ChoosePhoto);
