
(() =>
{
  class TutorialPage extends Polymer.mixinBehaviors([Polymer.AppLocalizeBehavior], Polymer.Element)
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
      super.connectedCallback();

      this.loadResources(this.resolveUrl('tutorial-page-locales.json'));
    }

    tick()
    {
      // method does nothing
    }
  }

  customElements.define(TutorialPage.is, TutorialPage);
})();
