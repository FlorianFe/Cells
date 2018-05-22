(() =>
{
  const SECOND = 1000; // milliseconds

  class GameOfLife extends Polymer.Element
  {
    static get is() { return 'game-of-life'; }

    static get properties()
    {
      return {
        selectedPage:
        {
          type: Number,
          value: 0
        }
      }
    }

    constructor()
    {
      super();
    }

    ready()
    {
      super.ready();
    }

    connectedCallback()
    {
      super.connectedCallback();

      let ironPages = this.shadowRoot.querySelector('iron-pages');
      let mainMenuPage = this.shadowRoot.querySelector('main-menu-page');
      let windowFrame = this.shadowRoot.querySelector('rough-window-frame');

      setInterval(() => ironPages.selectedItem.tick(), SECOND); // centralized interval

      mainMenuPage.addEventListener('sandbox-mode-selected', () => { this.selectedPage = 1; });
      mainMenuPage.addEventListener('tutorial-selected', () => { this.selectedPage = 0; });
      mainMenuPage.addEventListener('settings-selected', () => { this.selectedPage = 2; });

      windowFrame.addEventListener('back-to-menu', () => { this.selectedPage = 0; })
    }
  }

  customElements.define(GameOfLife.is, GameOfLife);
})();
