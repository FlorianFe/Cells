(() =>
{
  class MainMenuPage extends Polymer.Element
  {
    static get is()
    {
      return 'main-menu-page';
    }

    static get properties()
    {
      return {
        cellColor: { type: String, value: '#0000ff' }, // in RGB - Hexadecimal Code
        roughness: { type: Number, value: 0.5 }
      }
    }

    connectedCallback()
    {
      super.connectedCallback();

      let buttonSandBoxMode = this.shadowRoot.querySelector('#button-sandbox-mode');
      let buttonTutorial = this.shadowRoot.querySelector('#button-tutorial');
      let buttonSettings = this.shadowRoot.querySelector('#button-settings');

      buttonSandBoxMode.addEventListener('click', () => this.dispatchEvent(new CustomEvent('sandbox-mode-selected', {})));
      buttonTutorial.addEventListener('click', () => this.dispatchEvent(new CustomEvent('tutorial-selected', {})));
      buttonSettings.addEventListener('click', () => this.dispatchEvent(new CustomEvent('settings-selected', {})));
    }

    getPentadecathlonData() // http://www.conwaylife.com/wiki/Pentadecathlon
    {
      return [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ]
    }

    getClockData() // http://www.conwaylife.com/wiki/Clock
    {
      return [
        0, 0, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 1, 0,
        0, 1, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 0, 0
      ]
    }

    tick()
    {
      this.shadowRoot.querySelector('game-field').calculateNextGeneration();
    }
  }

  customElements.define(MainMenuPage.is, MainMenuPage);
})();
