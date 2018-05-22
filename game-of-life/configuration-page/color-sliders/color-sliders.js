
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

  onComponentChanged()
  {
    this.color = '#' + this.decimalToHex(this.r) + this.decimalToHex(this.g) + this.decimalToHex(this.b);
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
