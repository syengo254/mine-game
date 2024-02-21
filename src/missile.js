import { checkHit } from "./checkhit.js";

export default class Missile {

    constructor(player, isEnemy = false){
        this.player = player;
        this.isEnemy = isEnemy;
        this.scale = .25;
        this.width = 38 * this.scale;
        this.height = 89 * this.scale;

        if(!isEnemy){
            this.y = (player.position.y - this.height);
            this.speed = -7.5;
            this.image = document.getElementById('missile');
        }
        else{
            this.y = (player.position.y + this.height);
            this.speed = 5;
            this.image = document.getElementById('enemy_missile');
        }

        this.position = {
            x: (player.position.x + player.width / 2) - (this.width / 2),
            y: this.y,
        }

        this.markedForDeletion = false;
    }

    update(){
        this.position.y += this.speed;

        if(!this.isEnemy && this.position.y <= - this.height){
            this.markedForDeletion = true;
        }

        if(this.isEnemy && this.position.y > this.player.game.gameHeight + this.height){
            this.markedForDeletion = true;
        }

        if(this.isEnemy){
            if(checkHit(this, this.player.game.player)){
                console.log('player hit');
                this.markedForDeletion = true;
                this.player.game.player.lives -= 1;
            }
        }
        else{
            this.player.game.enemies.forEach( enemy => {
                if(checkHit(this, enemy)){
                    console.log('enemy hit');
                    enemy.markedForDeletion = true;
                    this.markedForDeletion = true;
                    this.player.game.score += Math.floor(500 * this.player.lives / 3);
                    this.player.ammo += .5;
                }
            });
        }
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}