var height = 0;
var width = 0;
var lifes = 1;
var time = 15;
var killedFly = true;
var createFlyTime = 1500;
var parendElement;
var count_click = 0;

var level = window.location.search;
level = level.replace("?", "");

if (level === "normal") {
  var createFlyTime = 1500;
} else if (level === "dificil") {
  var createFlyTime = 1000;
} else if (level === "chucknorris") {
  var createFlyTime = 750;
}

function addCountClick() {
  count_click++;
  console.log(count_click);
  document.getElementById("count_clicks").value = count_click;
}
function gameScreenSize() {
  height = window.innerHeight;
  width = window.innerWidth;
  console.log(width, height);
}
gameScreenSize();

var timer = setInterval(function () {
  time--;

  if (time < 0) {
    clearInterval(timer);
    clearInterval(createFly);
    window.location.href = `win.html?count=${count_click}`;
  } else {
    document.getElementById("timer").innerHTML = time;
  }
}, 1000);

function randomPosition() {
  if (!killedFly) {
    if (lifes >= 3) {
      window.location.href = `game_over.html?count=${count_click}`;
    } else {
      document.getElementById("l" + lifes).src = "imagens/coracao_vazio.png";

      lifes++;
    }
  }

  var mosca = document.getElementById("mosca");
  if (mosca) {
    mosca.remove();
  }

  killedFly = false;
  var positionX = Math.floor(Math.random() * width) - 90;
  var positionY = Math.floor(Math.random() * height) - 90;

  positionX = positionX < 0 ? 0 : positionX;
  positionY = positionY < 0 ? 0 : positionY;

  console.log(positionX, positionY);

  var splash = document.createElement("img");
  splash.src = "imagens/splash.png";
  splash.id = "splash";
  splash.className = "mosca1";
  splash.style.left = positionX + "px";
  splash.style.top = positionY + "px";
  splash.style.position = "absolute";

  var mosca = document.createElement("img");
  mosca.src = "imagens/mosca.png";
  mosca.className = randomSize() + " " + randomSide();
  mosca.style.left = positionX + "px";
  mosca.style.top = positionY + "px";
  mosca.style.position = "absolute";
  mosca.id = "mosca";
  mosca.onclick = function () {
    this.src = "imagens/splash.png";
    killedFly = true;
    addCountClick();
  };
  document.body.appendChild(mosca);
}

function randomSize() {
  var classe = Math.floor(Math.random() * 3);

  switch (classe) {
    case 0:
      return "mosca1";
    case 1:
      return "mosca2";
    case 2:
      return "mosca3";
  }
}

function randomSide() {
  var classe = Math.floor(Math.random() * 2);

  switch (classe) {
    case 0:
      return "sideA";
    case 1:
      return "sideB";
  }
}
