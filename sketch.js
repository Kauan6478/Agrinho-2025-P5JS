let farmer;
let trees = [];
let buildings = [];
let score = 0;
let gameTime = 60; // Tempo total em segundos
let startTime;
let gameState = "playing"; // Estados: playing, gameOver, victory

function setup() {
  createCanvas(800, 600);
  farmer = new Farmer();

  for (let i = 0; i < 5; i++) {
    let buildingWidth = random(50, 100);
    let buildingHeight = random(100, 200);
    let x = i * (width / 5) + random(0, width / 5 - buildingWidth);
    let y = height - buildingHeight - 150;
    buildings.push(new Building(x, y, buildingWidth, buildingHeight));
  }

  startTime = millis(); // Inicia o cronômetro
}

function draw() {
  background(135, 206, 235);

  if (gameState === "playing") {
    fill(34, 139, 34);
    rect(0, height - 150, width, 150); // Solo da cidade

    for (let building of buildings) {
      building.show();
    }

    for (let tree of trees) {
      tree.show();
    }

    farmer.show();

    // Mostrar pontuação
    fill(0);
    textSize(32);
    text("Árvores Plantadas: " + score, 10, 30);

    // Calcular o tempo restante
    let elapsedTime = (millis() - startTime) / 1000; // Tempo em segundos
    let remainingTime = gameTime - elapsedTime;

    if (remainingTime <= 0) {
      gameState = "gameOver"; // Muda para estado de GAME OVER se o tempo acabar
    }

    // Mostrar tempo restante
    textSize(25);
    text(
      "Tempo Restante: " + max(0, Math.floor(remainingTime)) + "s",
      width - 250,
      30
    );

    if (score >= 100) {
      gameState = "victory"; // Muda para estado de vitória se plantar 100 árvores
    }
  } else if (gameState === "gameOver") {
    fill(255, 0, 0); // Vermelho para GAME OVER
    textSize(64);
    textAlign(CENTER);
    text("GAME OVER!", width / 2, height / 2);
  } else if (gameState === "victory") {
    fill(0, 255, 0); // Verde para vitória
    textSize(64);
    textAlign(CENTER);
    text("VOCÊ VENCEU!", width / 2, height / 2);

    noLoop(); // Para o jogo
  }
}

class Farmer {
  constructor() {
    this.x = width / 2;
    this.y = height - 130;
    this.size = 100;
    this.speed = 5;
    textSize(this.size);
    this.emoji = "👩‍🌾";
  }

  show() {
    fill(0);
    text(this.emoji, this.x - this.size / 2, this.y + this.size / 4);

    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }

    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    this.y = constrain(this.y, height - 200, height - 130);
  }
}

class Tree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(30, 50);
  }

  show() {
    fill(0, 128, 0);
    ellipse(this.x, this.y - this.size / 2, this.size, this.size * 1.5);
    fill(139, 69, 19);
    rect(this.x - this.size / 8, this.y, this.size / 4, this.size / 2);
  }
}

class Building {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  show() {
    fill(169, 169, 169);
    rect(this.x, this.y, this.width, this.height);

    fill(255);
    for (let j = this.y + 10; j < this.y + this.height; j += 20) {
      for (let k = this.x + 10; k < this.x + this.width; k += 20) {
        rect(k, j, 10, 10);
      }
    }
  }
}

function keyPressed() {
  if (key === "p" || key === "P") {
    if (gameState === "playing") {
      // Permitir plantar apenas enquanto estiver jogando
      let newTree = new Tree(farmer.x, height - 150);
      trees.push(newTree);
      score++;
    }
  }
}
