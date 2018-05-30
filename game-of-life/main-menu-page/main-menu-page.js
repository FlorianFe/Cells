(() =>
{
  class MainMenuPage extends Polymer.mixinBehaviors([Polymer.AppLocalizeBehavior], Polymer.Element)
  {
    static get is()
    {
      return 'main-menu-page';
    }

    static get properties()
    {
      return {
        cellColor: { type: String, value: '#0000ff' }, // in RGB - Hexadecimal Code
        roughness: { type: Number, value: 0.5 },
        language: { type: String, notify: true }
      }
    }

    connectedCallback()
    {
      super.connectedCallback();

      this.loadResources(this.resolveUrl('main-menu-page-locales.json'));

      let buttonSandBoxMode = this.shadowRoot.querySelector('#button-sandbox-mode');
      let buttonTutorial = this.shadowRoot.querySelector('#button-tutorial');
      let buttonSettings = this.shadowRoot.querySelector('#button-settings');

      buttonSandBoxMode.addEventListener('click', () => this.dispatchEvent(new CustomEvent('sandbox-mode-selected', {})));
      buttonTutorial.addEventListener('click', () => this.dispatchEvent(new CustomEvent('tutorial-selected', {})));
      buttonSettings.addEventListener('click', () => this.dispatchEvent(new CustomEvent('settings-selected', {})));
    }

    tick()
    {
      this.shadowRoot.querySelector('game-field').calculateNextGeneration();
    }
  }

  customElements.define(MainMenuPage.is, MainMenuPage);
})();
