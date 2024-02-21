import Missile from "./missile.js";

export default class Enemy {

    constructor(game){
        this.game = game;
        this.image = document.getElementById('enemy');
        this.scale = 0.16;
        this.width = Math.floor(191 * this.scale);
        this.height = Math.floor(266 * this.scale);
        let seedX = Math.ceil(Math.random() * 10) / 10;
        let seedY = Math.ceil(Math.random() * 10) / 10;
        this.speedY = 1 + seedY;
        this.speedX = Math.floor(Math.random() * 10) > 5 ? -2 : 2;
        this.speedX += seedX;
        this.reset();
        this.fireRate = 1000;
    }

    reset(){
        this.position = {
            x: Math.ceil(Math.random() * (this.game.gameWidth - this.width)),
            y: Math.floor( Math.random() * 100),
        }
        this.lastFired = 0;
    }

    move(){
        this.position.y += this.speedY;
        this.position.x += this.speedX;

        if(this.position.y >= this.game.gameHeight / 2 || this.position.y <= 0){
            this.speedY *= -1;
        }

        if(this.position.x < 0 || this.position.x > this.game.gameWidth - this.width){
            this.speedX *= -1;
        }
    }

    fire(dt){
        let elapsed = dt - this.lastFired;
        let alongPlayerX = (this.position.x + this.width / 2) >= this.game.player.position.x - 5 && (this.position.x + this.width / 2) <= (this.game.player.position.x + this.game.player.width + 5);

        if(elapsed >= this.fireRate && alongPlayerX){
            this.game.addGameObject( new Missile(this, true));
            this.lastFired = dt;
        }
    }

    update(dt){
        this.move();
        this.fire(dt);
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}