const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  display: inline-block;
  align-self: center;
  --height: 25px;
  --width: 50px;
  --circle-height: calc(var(--height) - 2px);
  --circle-width: var(--circle-height);
}

:host([hidden]) {
  display: none;
}

input {
  display: none;
}

div {
  margin: 0 auto;
}

input+div {
  vertical-align: middle;
  width: var(--width);
  height: var(--height);
  border: 1px solid rgba(0, 0, 0, .4);
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.1);
  transition: .5s all;
  pointer-events: none;
}

input:checked+div {
  background-color: rgb(0, 255, 0);
}

input+div>div {
  float: left;
  height: var(--circle-height);
  width: var(--circle-width);
  border-radius: 999px;
  background: white;
  transition: 0.5s all cubic-bezier(.54, 1.85, .5, 1);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3), 0px 0px 0 1px rgba(0, 0, 0, 0.4);
  margin-top: 1px;
  margin-left: 1px;
  pointer-events: none;
}

input:checked+div>div {
  transform: translate3d(calc(var(--width) - var(--height)), 0, 0);
}
</style>
<label class="toggle-switch"><input type="checkbox" checked><div><div></div></div></label>
`;

export default class ToggleSwitch extends HTMLElement {
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
    this.shadowRoot.querySelector('input').addEventListener('change', this._changeListener);
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('input').removeEventListener('change', this._changeListener);
  }
}

window.customElements.define('toggle-switch', ToggleSwitch);
