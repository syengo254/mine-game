import { GAMESTATE } from "./game.js";
import Missile from "./missile.js";

export default class Player {

    constructor(game){
        this.game = game;
        let scale = 0.3;
        this.width = 179 * scale;
        this.height = 188 * scale;
        this.image = document.getElementById('jet');
        this.moveSpeed = 5;
        this.speed = 0;
        this.reset();
    }

    reset(){
        this.position = {
            x: this.game.gameWidth / 2 - this.width /2,
            y: this.game.gameHeight - this.height - 20,
        };
        this.firing = false;
        this.ammo = 20; 
        this.lives = 3;
    }

    moveLeft(){
        this.speed = - this.moveSpeed;
    }

    moveRight(){
        this.speed = this.moveSpeed;
    }

    fire() {
        if(this.firing || this.ammo < 1) return;

        this.firing = true;
        const missile = new Missile(this);
        this.game.addGameObject(missile);
        this.ammo -= 1;
    }

    stop(){
        this.speed = 0;
    }

    update(){
        this.position.x += this.speed;

        if (this.position.x <= 0){
            this.position.x = 0;
            this.speed = 0;
        }
        else if (this.position.x >= this.game.gameWidth - this.width){
            this.position.x = this.game.gameWidth - this.width
            this.speed = 0;
        }

        if(this.lives <= 0){
            this.game.gameState = GAMESTATE.GAMEOVER;
        }
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);

        //draw health bar
        ctx.fillStyle = 'rgba(200,10,90, 1)';
        ctx.fillRect(this.position.x, this.position.y + this.height, this.width * this.lives / 3, 8);
        ctx.strokeStyle = 'rgba(200, 10, 90 , 1)';
        ctx.strokeRect(this.position.x - 1, this.position.y + this.height - 1, this.width + 2, 10);
    }
}