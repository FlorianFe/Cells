(() =>
{
  const rough = require('roughjs');

  const draw = (svg, polygons, config) =>
  {
    svg.innerHTML = '';

    const rc = rough.svg(svg);

    polygons.forEach((polygon) => svg.appendChild(rc.polygon(polygon, config)));
  }

  class RoughFilledPolygonIcon extends Polymer.Element
  {
    static get is()
    {
      return 'rough-filled-polygon-icon';
    }

    static get properties()
    {
      return {
        roughness: { type: Number, value: 1.0 },
        fill: { type: String, value: '#000000' },
        hoverColor: { type: String, value: '#aaaaaa' },
        polygons: { type: Array, value: [ ] }
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

      this.addEventListener('mouseover', () => draw(svg, this.polygons, { stroke: this.hoverColor, fill: this.hoverColor, roughness: this.roughness }));
      this.addEventListener('mouseout', () => draw(svg, this.polygons, { stroke: this.fill, fill: this.fill, roughness: this.roughness }));

      draw(svg, this.polygons, { stroke: this.fill, fill: this.fill, roughness: this.roughness });
    }

    render()
    {
      let svg = this.shadowRoot.querySelector('svg');

      draw(svg, this.polygons, { stroke: this.fill, fill: this.fill, roughness: this.roughness });
    }
  }

  customElements.define(RoughFilledPolygonIcon.is, RoughFilledPolygonIcon);
})();
