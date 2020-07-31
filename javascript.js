const result = Number(window.prompt("Выберите уровень сложности: 1 - Легко, 2 - Средне, 3 - Сложно"), 1);
let snakeColor;
let random;
var canvas = document.getElementById('game')
var context = canvas.getContext('2d')
var grid = 20;
var speed = 0;
let timer;
var snake = {
  x: 160,
  y: 160,

  dx: grid,
  dy: 0,

  cells: [],
  Length: 1
}

var eat = {
  x: 320,
  y: 320
}

var bigEat = {
  x: 0,
  y: 0
}

var grib = {
  x: 159,
  y: 146
}

let scoreSnake = 0;
let nowSpeed = -10;
switch (result) {
  case 1:
    nowSpeed = -10;
    snakeColor = 'img/shkura.jpg'
    break;
  case 2:
    nowSpeed = -7;
    snakeColor = 'img/shkura2.jpg'
    break;
  case 3:
    nowSpeed = -2;
    snakeColor = 'img/shkura3legendary.jpg'
    break;
  default:

}
function generator(min, max) {
  return Math.floor(Math.random()*(max - min)) + min;
}

function loop() {
  requestAnimationFrame(loop);
  if (++speed < 4) {
    return;
  }
document.getElementById("score12").innerHTML = scoreSnake;


  speed = nowSpeed;


  // console.log('speed', speed);
  // console.log('nowSpeed', nowSpeed);

  context.clearRect(0,0, canvas.width, canvas.height);
  if(snake.Length!==0 && snake.Length % 10 == 0) {

    const imgbigEat = new Image();
    imgbigEat.src = 'img/eat1.png';
    context.drawImage(imgbigEat, bigEat.x, bigEat.y, 40, 40);
     timer = setTimeout(() => {
      bigEat.x = bigEat.y = -40;
    },5000)
  }
  if(snake.Length!==0 && snake.Length % random == 0) {

    const imgGrib = new Image();
    imgGrib.src = 'img/grib.ico';
    context.drawImage(imgGrib, grib.x, grib.y, 20, 20);
     timer = setTimeout(() => {
      grib.x = grib.y = -40;
    },5000)
  }

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x === canvas.width || snake.y === canvas.height || snake.x < 0 || snake.y < 0) {
    alert("Вы проиграли! Ваш счет равен: " + scoreSnake + ". " + "Для новой игры нажмите F5");
    location.href=location.href;


  }


  snake.cells.unshift({x: snake.x, y: snake.y})
  if (snake.cells.length > snake.Length) {
    snake.cells.pop();
  }

  var img = new Image();
  img.src = snakeColor;

  const imgEat = new Image();
  imgEat.src = 'img/eat1.png';
  context.drawImage(imgEat, eat.x, eat.y, 20, 20);
  // context.fillRect(eat.x, eat.y, grid - 1,  grid - 1);
  const pattern = context.createPattern(img, 'repeat');
  context.fillStyle = pattern;

  snake.cells.forEach(function(cell, index) {
    context.fillRect(cell.x, cell.y, grid - 2,  grid - 2);


    if(cell.x == eat.x && cell.y == eat.y) {
      snake.Length++;
      scoreSnake = scoreSnake + result;

      eat.x = generator(0, 30) * grid;
      eat.y = generator(0, 30) * grid;
      console.log(scoreSnake);
      while (cell.x == eat.x && cell.y == eat.y) {
      eat.x = generator(0, 30) * grid;
      eat.y = generator(0, 30) * grid;
      }
      if(snake.Length!==0 && snake.Length % 10 == 0) {
        console.log(scoreSnake, nowSpeed);
        nowSpeed += 1;
        bigEat.x = generator(3, 29) * grid;
        bigEat.y = generator(3, 29) * grid;
      }
      if(snake.Length!==0 && snake.Length % generator(3, 10) == 0) {
        grib.x = generator(0, 29) * grid;
        grib.y = generator(0, 29) * grid;
        random = generator(3, 10);
      }
    }
    if(cell.x == bigEat.x && cell.y == bigEat.y ||
      cell.x == bigEat.x + grid && cell.y == bigEat.y ||
      cell.x == bigEat.x && cell.y == bigEat.y + grid ||
      cell.x == bigEat.x + grid && cell.y == bigEat.y + grid) {
      snake.Length += 1;
      scoreSnake += 5;
      console.log(cell.x, bigEat.x);
      bigEat.x = 0;
      bigEat.y = 0;

    }
    for(let i = index + 1; i < snake.cells.length; i++) {
      if(cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        alert("Вы проиграли! Ваш счет равен: " + scoreSnake + ". " + "Для новой игры нажмите F5");
        location.href=location.href;


      }
    }
  })
document.addEventListener('keydown', function(e){
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  else if (e.which === 38 && snake.dy === 0){
    snake.dy = -grid;
    snake.dx = 0;
  }
  else if (e.which === 39 && snake.dx === 0){
    snake.dx = grid;
    snake.dy = 0;
  }
  else if (e.which === 40 && snake.dy === 0){
    snake.dy = grid;
    snake.dx = 0;
  }
})
}


requestAnimationFrame(loop);
clearTimeout(timer);
