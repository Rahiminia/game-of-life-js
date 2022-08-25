const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const percentageInput = document.getElementById('randomness-input-id');
const resetButton = document.getElementById('reset-btn');

let randomness = 10;
percentageInput.value = randomness;

percentageInput.addEventListener('focus', function () {
  percentageInput.select();
});

percentageInput.addEventListener('keypress', function (e) {
  if(e.key==='Enter')
    resetButton.click();
});

resetButton.addEventListener('click', function () {
  const newPercentage = parseInt(percentageInput.value);
  if(newPercentage > 0 && newPercentage < 90){
    randomness = newPercentage;
    initWorld();
  }
  else {
    percentageInput.value = 10;
    percentageInput.focus();
  }
});

function drawWorld(ctx, world, h, w){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i=0; i<h; i++)
    for (let j=0; j<w; j++){
      world[i][j]===1?ctx.fillRect(i*10,j*10,10,10):{};
    }
}

function countNeighbors(arr, h, w, m, n){
  let res=0;
  for(let i=-1; i<=1; i++)
    for(let j=-1; j<=1; j++){
      if(m+i<0) continue;
      if(n+j<0) continue;
      if(m+i>=h) continue;
      if(n+j>=w) continue;
      arr[m+i][n+j]?res++:{}
    }
  arr[m][n]?res--:{}
  return res;
}

function processEvolution(cell, neighbors){
  let res=cell;
  if(cell===1)
    if(neighbors===3||neighbors===2)
      res=1;
    else
      res=0;
  else
    if(neighbors===3)
      res=1;
    else
      res=0;
  return res;
}

function evolution(world, h, w){
  newWorld=Array(h);
  for(let n=0;n<h;n++)
    newWorld[n]=[...world[n]];

  for (let i=0; i<h; i++)
    for (let j=0; j<w; j++){
      const lives = countNeighbors(world, h, w, i, j);
      newWorld[i][j]=processEvolution(world[i][j], lives);
    }
  return newWorld;
}

function initWorld() {
  for (let i=0; i<h; i++)
    for (let j=0; j<w; j++)
      world[i][j]=Math.random()*100<randomness?1:0;
}

const h=50;
const w=50;
let world = Array(h);

for (let i=0; i<h; i++){
  world[i]=Array(w);
}

initWorld();

setInterval(()=>{
  drawWorld(ctx, world, h, w);
  world=evolution(world,h,w);
},200);
