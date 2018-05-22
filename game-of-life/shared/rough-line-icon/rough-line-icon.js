(() =>
{
  const rough = require('roughjs');

  const draw = (svg, lines, config) =>
  {
    svg.innerHTML = '';

    const rc = rough.svg(svg);

    lines.forEach((line) => svg.appendChild(rc.line(line.x1, line.y1, line.x2, line.y2, config)));
  }

  class RoughLineIcon extends Polymer.Element
  {
    static get is()
    {
      return 'rough-line-icon';
    }

    static get properties()
    {
      return {
        roughness: { type: Number, value: 1.0 },
        hoverColor: { type: String, value: '#aaaaaa' },
        lines: { type: Array, value: [ ] }
      }
    }

    static get observers()
    {
      return [
        "render(roughness)"
      ];
    }

    connectedCallback()
    {
      super.connectedCallback();

      let svg = this.shadowRoot.querySelector('svg');

      this.addEventListener('mouseover', () => draw(svg, this.lines, { stroke: this.hoverColor, roughness: this.roughness }));
      this.addEventListener('mouseout', () => draw(svg, this.lines, { stroke: '#000000', roughness: this.roughness }));

      draw(svg, this.lines, { stroke: '#000000', roughness: this.roughness });
    }

    render()
    {
      let svg = this.shadowRoot.querySelector('svg');

      draw(svg, this.lines, { stroke: '#000000', roughness: this.roughness });
    }
  }

  customElements.define(RoughLineIcon.is, RoughLineIcon);
})();
