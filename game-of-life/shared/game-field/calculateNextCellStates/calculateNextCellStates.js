
const zeros = require('zeros'); //from https://github.com/scijs/zeros

const NEIGHBOURHOOD_VECTORS = [
  [-1, -1], [0, -1], [+1, -1],
  [-1,  0],          [+1,  0],
  [-1, +1], [0, +1], [+1, +1]
];

module.exports = (cellStates, bornRules, dieRules) =>
{
  const sx = cellStates.shape[0]; // size in x direction
  const sy = cellStates.shape[1]; // size in y direction

  let nextStates = zeros([sx, sy]); // create 2d - array filled with zeros

  for(let x=0; x<sx; x++)
  for(let y=0; y<sy; y++)
  {
    const nextState = calculateNextStateOfCell(x, y, cellStates, bornRules, dieRules);
    nextStates.set(x, y, nextState);
  }

  return nextStates;
}

function calculateNextStateOfCell(x, y, cellStates, bornRules, dieRules)
{
  const cellIsAlive = getBorderInvariantLivingStatusOfCell(x, y, cellStates);
  const amountOfLivingNeighbours = countLivingNeighbours(x, y, cellStates);

  return (cellIsAlive) ? !dieRules[amountOfLivingNeighbours] : bornRules[amountOfLivingNeighbours];
}

function countLivingNeighbours(x, y, cellStates)
{
  const neighbours = NEIGHBOURHOOD_VECTORS.map((vector) =>
    getBorderInvariantLivingStatusOfCell(x + vector[0], y + vector[1], cellStates)
  );

  return neighbours.reduce((sum, summand) => (sum + summand), 0);
}

function getBorderInvariantLivingStatusOfCell(x, y, cellStates)
{
  const sx = cellStates.shape[0]; // size in x direction
  const sy = cellStates.shape[1]; // size in y direction

  while(x < 0) x += sx; // enforces x > 0
  while(y < 0) y += sy; // enforces y > 0

  const borderInvariantX = x % sx; // enforces x < sx
  const borderInvariantY = y % sy; // enforces y < sy

  return cellStates.get(borderInvariantX, borderInvariantY);
}
