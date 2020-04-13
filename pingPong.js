let players = [];
let b;

function setup() {
    createCanvas(600, 600);
    let pad = 20

    players[0] = new Player(pad)
    players[1] = new Player(width - 2*pad)
    b = new Ball()
}
function draw() {
    background(51);
    fill(127);
    noStroke();
    rect(width/2 - 1, 0, 2, height);
    
    for (let i = 0; i < players.length; i++) {
        players[i].update()
    }
    b.update();
}

class Player {
    constructor(x) {
        this.w = 20;
        this.h = 80;
        
        this.dir = 0;
        this.pos = createVector(x, height/2)
        
        this.v = createVector(0, 7)
        this.score = 0;
    }
    display() {
        fill(255);
        strokeWeight(2);
        rect(this.pos.x, this.pos.y, this.w, this.h)
    }
    move() {
        this.pos.y += this.v.y * this.dir;
    }
    update() {
        this.display();
        this.move();
    }
}
class Ball {
    constructor() {
        this.r = 30;

        this.pos = createVector(width/2, height/2);
        this.v = createVector(0, 0)
        this.acc = createVector(0, 0)

        this.applyForce(createVector(5, 2));
        this.lastGoal = 0;
    }
    score() {
        this.pos = createVector(width/2, height/2);
        this.v = createVector(0, 0);
        this.acc = createVector(0, 0);
        
        this.applyForce(createVector(5 * this.lastGoal, floor(random(-3, 3))));
    }
    update() {
        this.display()
        this.move();
        this.checkPlayers();
        this.checkBorders();
        this.checkScore();
    }
    display() {
        ellipseMode(CENTER);
        fill(255, 158);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }
    move() {
        this.v.add(this.acc);
        this.pos.add(this.v)
        this.acc.mult(0);
    }
    applyForce(f) {
        this.acc.add(p5.Vector.div(f, 1));
    }
    checkPlayers() {
        if (this.pos.x < players[0].pos.x + players[0].w) {
            if (players[0].pos.y < this.pos.y && this.pos.y < players[0].pos.y + players[0].h) {
                this.v.x *= -1;
                this.pos.x = players[0].pos.x + players[0].w;
            }
        } else if (this.pos.x > players[1].pos.x - players[1].w) {
            if (players[1].pos.y < this.pos.y && this.pos.y < players[1].pos.y + players[1].h) {
                this.v.x *= -1;
                this.pos.x = players[1].pos.x - players[1].w;
            }
        }
        
    }
    checkBorders() {
        if (this.pos.y > height) {
            this.v.y *= -1;
            this.pos.y = height;
        } else if (this.pos.y < 0) {
            this.v.y *= -1;
            this.pos.y = 0;
        }
    }
    checkScore() {
        if (this.pos.x > width) {
            players[0].score++;
            this.lastGoal = 1;
            this.score();
        } else if (this.pos.x < 0) {
            players[1].score++
            this.lastGoal = -1;
            this.score();
        }
    }
}

function keyPressed() {
    if (key == 'q') {
        players[0].dir = -1;
    } else if (key == 'w') {
        players[0].dir = 1;
    } else if (key === 'i') {
        players[1].dir = -1;
    } else if (key ==='o') {
        players[1].dir = 1;
    }
}

function keyReleased() {
    if (key == 'q' || key == 'w') {
        players[0].dir = 0;
    }
    if (key == 'i' || key == 'o') {
        players[1].dir = 0;
    }
}