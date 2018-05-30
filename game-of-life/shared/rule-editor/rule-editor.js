(() =>
{
  const rough = require('roughjs');

  const CELL_SIZE = 75;
  const AMOUNT_OF_CELL_NEIGHBOUR_STATES = 9;
  const CIRCLE_DIAMETER = 30;

  class RuleEditor extends Polymer.Element
  {
    static get is()
    {
      return 'rule-editor';
    }

    static get properties()
    {
      return {
        editable: { type: Boolean, value: false },
        roughness: { type: Number, value: 1.0 },
        bornRules: { type: Array, value: [0, 0, 0, 1, 0, 0, 0, 0, 0], notify: true },
        dieRules: { type: Array, value: [1, 1, 0, 0, 1, 1, 1, 1, 1], notify: true }
      }
    }

    static get observers()
    {
      return [
        "render(cellColor, roughness)"
      ];
    }

    connectedCallback()
    {
      super.connectedCallback();

      const svg = this.shadowRoot.querySelector('svg');

      svg.addEventListener('click', (e) =>
      {
        if(this.editable)
        {
          const globalX = e.pageX;
          const globalY = e.pageY;

          const bounds = svg.getBoundingClientRect();

          const svgWidth = svg.width.animVal.value;
          const svgHeight = svg.height.animVal.value;

          const scaleX =  700 / svgWidth;
          const scaleY =  200 / svgHeight;

          const localX = scaleX * (globalX - bounds.left);
          const localY = scaleY * (globalY - bounds.top);

          for(let i=0; i < AMOUNT_OF_CELL_NEIGHBOUR_STATES; i++)
          {
            {
              const centerPointX = CELL_SIZE * i + 50;
              const centerPointY = 100;

              const diffX = centerPointX - localX;
              const diffY = centerPointY - localY;

              const distance = Math.sqrt(diffX ** 2 + diffY ** 2);
              const circleRadius = CIRCLE_DIAMETER / 2;

              if(distance <= circleRadius)
              {
                this.set(["bornRules", i], (this.bornRules[i]) ? 0 : 1);

                this.render();
              }
            }

            {
              const centerPointX = CELL_SIZE * i + 50;
              const centerPointY = 150;

              const diffX = centerPointX - localX;
              const diffY = centerPointY - localY;

              const distance = Math.sqrt(diffX ** 2 + diffY ** 2);
              const circleRadius = CIRCLE_DIAMETER / 2;

              if(distance <= circleRadius)
              {
                this.set(["dieRules", i], (this.dieRules[i]) ? 0 : 1);

                this.render();
              }
            }
          }
        }
      });

      this.render();
    }

    render()
    {
      const svg = this.shadowRoot.querySelector('svg');
      svg.innerHTML = ''; // clean SVG - Element

      const rc = rough.svg(svg);

      const oneConfig1 = { roughness: this.roughness, fill: '#8bc34a', stroke: '#8bc34a' };
      const oneConfig2 = { roughness: this.roughness, fill: '#ff5722', stroke: '#ff5722' };
      const zeroConfig = { roughness: this.roughness };

      for(let i=0; i < AMOUNT_OF_CELL_NEIGHBOUR_STATES; i++)
      {
        const config1 = (this.bornRules[i]) ? oneConfig1 : zeroConfig;
        const config2 = (this.dieRules[i]) ? oneConfig2 : zeroConfig;

        this.drawStrokes(svg, rc, i);

        const node1 = rc.circle(CELL_SIZE * i + 50, 100, CIRCLE_DIAMETER, config1);
        const node2 = rc.circle(CELL_SIZE * i + 50, 150, CIRCLE_DIAMETER, config2);

        svg.appendChild(node1);
        svg.appendChild(node2);
      }
    }

    drawStrokes(svg, rc, number)
    {
      if(number >= 5)
      {
        const x1 = CELL_SIZE * number - number * 3 - 2 + 50;
        const x2 = CELL_SIZE * number - number * 3 + 22 + 50;

        const node = rc.line(x1, 25, x2, 60, { roughness: this.roughness });
        svg.appendChild(node);
      }

      for(let i=0; i<number; i++)
      {
        if(i != 4) // 5th stroke
        {
          const x = CELL_SIZE * number - number * 3 + i * 6 + 50;

          const node = rc.line(x, 25, x, 60, { roughness: this.roughness });

          svg.appendChild(node);
        }
      }
    }
  }

  customElements.define(RuleEditor.is, RuleEditor);
})();
