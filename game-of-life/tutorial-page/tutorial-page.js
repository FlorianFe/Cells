
(() =>
{
  class TutorialPage extends Polymer.Element
  {
    static get is()
    {
      return 'tutorial-page';
    }

    static get properties()
    {
      return {

      }
    }

    connectedCallback()
    {
      super.connectedCallback()
    }

    tick()
    {
      console.log("tick");
    }
  }

  customElements.define(TutorialPage.is, TutorialPage);
})();
