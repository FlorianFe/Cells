
class SandboxModePage extends Polymer.Element
{
  static get is()
  {
    return 'sandbox-mode-page';
  }

  static get properties()
  {
    return {
      cellColor: { type: String, value: '#0000ff' }, // in RGB - Hexadecimal Code
      roughness: { type: Number, value: 1.0 },
      running: { type: Boolean, value: false }
    }
  }

  constructor()
  {
    super();
  }

  connectedCallback()
  {
    super.connectedCallback();

    this.shadowRoot.querySelector('#play-button').addEventListener('click', () =>
    {
      this.running = !this.running;
      this.shadowRoot.querySelector('#play-button').innerText = (this.running) ? "pause" : "play";
    });
  }

  tick()
  {
    if(this.running) this.shadowRoot.querySelector('game-field').calculateNextGeneration();
  }
}

customElements.define(SandboxModePage.is, SandboxModePage);
