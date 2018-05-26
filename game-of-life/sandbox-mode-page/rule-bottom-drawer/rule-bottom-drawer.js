(() =>
{
  class RuleBottomDrawer extends Polymer.Element
  {
    static get is()
    {
      return 'rule-bottom-drawer';
    }

    static get properties()
    {
      return {
        opened: { type: Boolean, value: false },
        roughness: { type: Number, value: 1.0 },
        bornRules: { type: Array, value: [0, 0, 0, 1, 0, 0, 0, 0, 0], notify: true },
        dieRules: { type: Array, value: [1, 1, 0, 0, 1, 1, 1, 1, 1], notify: true }
      }
    }

    connectedCallback()
    {
      super.connectedCallback();

      this.shadowRoot.querySelector('#open-close-icon').addEventListener('click', () => (this.opened = !this.opened));
    }

    static get observers()
    {
      return [
        "openedChanged(opened)"
      ];
    }

    openedChanged()
    {
      this.style.bottom = (this.opened) ? "0px" : "-140px";
    }

    not(value)
    {
      return !value;
    }
  }

  customElements.define(RuleBottomDrawer.is, RuleBottomDrawer);
})();
