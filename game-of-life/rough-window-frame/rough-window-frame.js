(() =>
{
  const { remote } = require('electron');

  class RoughWindowFrame extends Polymer.Element
  {
    static get is()
    {
      return 'rough-window-frame';
    }

    static get properties()
    {
      return {
        roughness: { type: Number, value: 1.0 }
      }
    }

    connectedCallback()
    {
      super.connectedCallback();

      this.shadowRoot.querySelector('#menu-icon').addEventListener('click', () => this.dispatchEvent(new CustomEvent('back-to-menu', {})))
      this.shadowRoot.querySelector('#close-icon').addEventListener('click', () => remote.BrowserWindow.getFocusedWindow().close());
      this.shadowRoot.querySelector('#minimize-icon').addEventListener('click', () => remote.BrowserWindow.getFocusedWindow().minimize());
    }
  }

  customElements.define(RoughWindowFrame.is, RoughWindowFrame);
})();
