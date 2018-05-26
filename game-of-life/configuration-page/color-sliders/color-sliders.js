(() =>
{
  class ColorSliders extends Polymer.Element
  {
    static get is()
    {
      return 'color-sliders';
    }

    static get properties()
    {
      return {
        color: { type: String, notify: true},
        r: { type: Number, value: 128 },
        g: { type: Number, value: 128 },
        b: { type: Number, value: 128 }
      }
    }

    static get observers()
    {
      return [
        "onComponentChanged(r, g, b)"
      ];
    }

    onComponentChanged(r, g, b)
    {
      this.color = this.rgbToHex(this.r, this.g, this.b);

      // force rendering on all game fields for uniform visual effect
      this.shadowRoot.querySelectorAll('game-field').forEach((gameField) => gameField.render());
    }

    rgbToHex(r, g, b)
    {
      return '#' + this.decimalToHex(r) + this.decimalToHex(g) + this.decimalToHex(b);
    }

    decimalToHex(decimal)
    {
      if(decimal < 0 || decimal > 255) return '00';
      return ((decimal < 16) ? '0' : '') + decimal.toString(16);
    }

    connectedCallback()
    {
      super.connectedCallback()
    }
  }

  customElements.define(ColorSliders.is, ColorSliders);
})();
