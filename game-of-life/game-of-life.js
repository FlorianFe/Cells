(() =>
{
  const CONFIGURATION = require('./game-of-life/config.json');

  const MENU_PAGE = 0;
  const SANDBOX_MODE_PAGE = 1;
  const TUTORIAL_PAGE = 2;
  const SETTINGS_PAGE = 3;

  class GameOfLife extends Polymer.Element
  {
    static get is() { return 'game-of-life'; }

    static get properties()
    {
      return {
        selectedPage: { type: Number, value: 0 },
        language: { type: String }
      }
    }

    connectedCallback()
    {
      super.connectedCallback();

      // just for the www.it-talents.de challange
      this.language = (CONFIGURATION.language) ? CONFIGURATION.language : 'en';

      let ironPages = this.shadowRoot.querySelector('iron-pages');
      let mainMenuPage = this.shadowRoot.querySelector('main-menu-page');
      let windowFrame = this.shadowRoot.querySelector('rough-window-frame');

      // centralized interval
      setInterval(() => ironPages.selectedItem.tick(), CONFIGURATION.interval);

      mainMenuPage.addEventListener('sandbox-mode-selected', () => { this.selectedPage = SANDBOX_MODE_PAGE; });
      mainMenuPage.addEventListener('tutorial-selected', () => { this.selectedPage = TUTORIAL_PAGE; });
      mainMenuPage.addEventListener('settings-selected', () => { this.selectedPage = SETTINGS_PAGE; });

      windowFrame.addEventListener('back-to-menu', () => { this.selectedPage = MENU_PAGE; })
    }
  }

  customElements.define(GameOfLife.is, GameOfLife);
})();
