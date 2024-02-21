export default class Stats {
    constructor( game ) {
        this.game = game;
        this.position = {
            x: game.gameWidth - 125,
            y: 10,
        }
        this.size = {
            w: 120,
            h: 60,
        }
    }

    update(dt){

    }

    draw(ctx){
        ctx.strokeRect( this.position.x - 1, this.position.y -1 , this.size.w + 2, this.size.h + 2);
        ctx.fillStyle = 'white';
        ctx.fillRect( this.position.x, this.position.y, this.size.w, this.size.h);

        //game score text
        ctx.font = "italic 14px Arial";
        ctx.fillStyle = "green";
        ctx.textAlign = "left";
        ctx.fillText(`Score: ${this.game.score}`, this.position.x + 10, this.position.y + 35);

        //lives text
        ctx.font = "italic 14px Arial";
        ctx.fillStyle = "orangered";
        ctx.textAlign = "left";
        let lives = [...Array(this.game.player.lives)].map( _ => '❤ ' );
        ctx.fillText(`Lives: ${lives.join('')}`, this.position.x + 10, this.position.y + 15);

        //ammo left text
        ctx.font = "bold 12px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText(`Ammo: ${this.game.player.ammo}`, this.position.x + 10, this.position.y + 55);
    }
}