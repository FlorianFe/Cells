(() =>
{
  const path = require('path');
  const rough = require('roughjs'); // from https://roughjs.com/
  const ndarray = require('ndarray'); // from https://github.com/scijs/ndarray
  const zeros = require('zeros'); //from https://github.com/scijs/zeros

  // relative to main.js
  const IMPORT_PATH = './game-of-life/shared/game-field/';

  const calculateNextCellStates = require(IMPORT_PATH + 'calculateNextCellStates/calculateNextCellStates');
  const readJsonFile = require(IMPORT_PATH + 'readJsonFile/readJsonFile');

  const CELL_SIZE = 50;

  class GameField extends Polymer.Element
  {
    static get is()
    {
      return 'game-field';
    }

    static get properties()
    {
      return {
        columns: { type: Number, value: 5 },
        rows: { type: Number, value: 5 },
        editable: {  type: Boolean, value: false},
        cellStates: { type: Object },
        cellStatesData: { type: Array }, // 0: dead, 1: alive
        jsonFilePath: { type: String }, // relative to index.html
        cellColor: { type: String, value: '#0000ff' }, // in RGB - Hexadecimal Code
        roughness: { type: Number, value: 1.0 }, // Roughness of Cell (roughjs)
        bornRules: { type: Array, value : [ 0, 0, 0, 1, 0, 0, 0, 0, 0 ] }, // 0: no change, 1: breed me
        dieRules: { type: Array, value : [ 1, 1, 0, 0, 1, 1, 1, 1, 1 ] } // 0: no change, 1: kill me
      }
    }

    static get observers()
    {
      return [
        "render(cellColor, roughness)",
        "loadJson(jsonFilePath)",
        "setup(cellStatesData)"
      ];
    }

    connectedCallback()
    {
      super.connectedCallback();

      this.setup();

      this.addEventListener('click', (e) =>
      {
        if(this.editable)
        {
          let globalX = e.pageX;
          let globalY = e.pageY;

          const svg = this.shadowRoot.querySelector('#field');
          const bounds = e.target.getBoundingClientRect();

          const localX = globalX - bounds.left;
          const localY = globalY - bounds.top;

          const sx = this.cellStates.shape[0]; // size in x direction
          const sy = this.cellStates.shape[1]; // size in y direction

          const svgWidth = svg.width.animVal.value;
          const svgHeight = svg.height.animVal.value

          const cellWidth = svgWidth / (sx + 1);
          const cellHeight = svgHeight / (sy + 1);

          const centerX = (localX / cellWidth) - 0.5;
          const centerY = (localY / cellHeight) - 0.5;

          const cellX = (centerX > 0) ? parseInt(centerX) : -1;
          const cellY = (centerY > 0) ? parseInt(centerY) : -1;

          if(this.isCoordinateInsideGameField(cellX, cellY, sx, sy))
          {
            const cellState = this.cellStates.get(cellX, cellY);

            this.cellStates.set(cellX, cellY, !cellState);

            this.render();
          }
        }
      });
    }

    setup()
    {
      if(this.cellStatesData)
      {
        // create 2d - array with array data
        const raw = ndarray(new Int8Array(this.cellStatesData), [this.rows, this.columns]);

        this.cellStates = raw.transpose(1, 0);
      }
      else
      {
        // create 2d - array filled with zeros
        this.cellStates = zeros([this.columns, this.rows]);
      }

      this.render();
    }

    loadJson()
    {
      readJsonFile(path.join(this.rootPath, this.jsonFilePath), (json) =>
      {
        const obj = JSON.parse(json);

        this.columns = obj.columns;
        this.rows = obj.rows;
        this.cellStatesData = obj.data;
      });
    }

    calculateNextGeneration()
    {
      this.cellStates = calculateNextCellStates(this.cellStates, this.bornRules, this.dieRules);

      this.render();
    }

    isCoordinateInsideGameField(x, y, sx, sy)
    {
      if(x < 0 || y < 0) return false;
      if(x > sx - 1 || y > sy - 1) return false;
      return true;
    }

    render()
    {
      if(this.cellStates)
      {
        const sx = this.cellStates.shape[0]; // size in x direction
        const sy = this.cellStates.shape[1]; // size in y direction

        const fieldWidth = (sx + 1) * CELL_SIZE;
        const fieldHeight = (sy + 1) * CELL_SIZE;

        const svg = this.shadowRoot.querySelector('#field');

        svg.setAttribute('viewBox', '0 0 ' + fieldWidth + ' ' + fieldHeight);
        svg.innerHTML = ''; // clean SVG - Element

        const rc = rough.svg(svg);

        const livingConfig = { roughness: this.roughness, fill: this.cellColor, fillWeight: 1.5 };
        const deadConfig = { roughness: this.roughness };

        for(let x=0; x<sx; x++)
        for(let y=0; y<sy; y++)
        {
          const px = (x + 0.5) * CELL_SIZE; // x position
          const py = (y + 0.5) * CELL_SIZE; // y position

          const config = (this.cellStates.get(x, y)) ? livingConfig : deadConfig;

          const node = rc.rectangle(px, py, CELL_SIZE, CELL_SIZE, config);

          svg.appendChild(node);
        }
      }
    }
  }

  customElements.define(GameField.is, GameField);
})();
