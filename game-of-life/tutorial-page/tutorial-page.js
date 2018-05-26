
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
}

customElements.define(TutorialPage.is, TutorialPage);
