
(() =>
{
  const rough = require('roughjs');

  class RoughBinaryVectorEditor extends Polymer.Element
  {
    static get is()
    {
      return 'rough-binary-vector-editor';
    }

    static get properties()
    {
      return {
        vector: { type: Array, value: [0, 0, 1, 0, 0, 0, 0, 0], notify: true },
        cellSize: { type: Number, value: 50 },
        cellColor: { type: String, value: '#000000' }
      }
    }

    static get observers()
    {
      return [
        "render(vector)"
      ];
    }

    connectedCallback()
    {
      super.connectedCallback();

      this.addEventListener('click', (e) =>
      {
        let x = e.pageX,
            y = e.pageY;
        let bounds = e.target.getBoundingClientRect();

        x = x - bounds.left;
        y = y - bounds.top;

        const index = parseInt(x / this.cellSize);

        const nextState = this.vector[index] ? 0 : 1;

        this.set(['vector', index], nextState);

        this.render();
      });

      this.render();
    }

    render()
    {
      if(this.vector)
      {
        const svg = this.shadowRoot.querySelector('svg');
        svg.innerHTML = ''; // clean SVG - Element

        const rc = rough.svg(svg);

        const oneConfig = { fill: this.cellColor, fillWeight: 3 };
        const zeroConfig = { };

        for(let i=0; i<this.vector.length; i++)
        {
          const config = (this.vector[i]) ? oneConfig : zeroConfig;

          const node = rc.rectangle(this.cellSize * i, 0, this.cellSize, this.cellSize, config);

          svg.appendChild(node);
        }
      }
    }
  }

  customElements.define(RoughBinaryVectorEditor.is, RoughBinaryVectorEditor);
})()
