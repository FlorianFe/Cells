(() =>
{
  class LanguageSelection extends Polymer.Element
  {
    static get is()
    {
      return 'language-selection';
    }

    static get properties()
    {
      return {
        language: { type: String, value: 'en', notify: true }
      }
    }

    connectedCallback()
    {
      super.connectedCallback();

      this.shadowRoot.querySelector('#language-button').addEventListener('click', () =>
      {
        this.language = (this.language === 'en') ? 'de' : 'en';
      });
    }

    isLanguageSelected(language, iso)
    {
      return (language === iso);
    }
  }

  customElements.define(LanguageSelection.is, LanguageSelection);
})();
