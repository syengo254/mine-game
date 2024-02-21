import Enemy from "./enemy.js";
import { drawGameOver, drawGameWon, drawMenu } from "./gamescreens.js";
import InputHandler from "./input.js";
import Player from "./player.js";
import Stats from "./stats.js";

export const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    WON: 4,
}

export default class Game {
    #gameObjects = [];

    constructor( w, h){
        this.gameWidth = w;
        this.gameHeight = h;
        this.player = new Player(this);
        this.enemies = [];
        
        new InputHandler(this.player, this);
        this.gameState = GAMESTATE.MENU;
        this.levelScore = 2500;
    }

    addGameObject(object){
        this.#gameObjects.push(object);
    }

    togglePause(){
        this.gameState = GAMESTATE.PAUSED;
    }

    generateEnemies(){
        for(let i = 0; i < 3; i++){
            const enemy = new Enemy(this);
            this.enemies.push(enemy);
        }
    }

    start(){
        this.addGameObject(this.player);
        this.addGameObject( new Stats(this));
        this.gameState = GAMESTATE.RUNNING;
        this.score = 0;
        this.generateEnemies();
    }

    restart(){
        this.gameState = GAMESTATE.RUNNING;
        this.score = 0;
        this.player.reset();
        this.enemies = [];
        this.generateEnemies();
    }

    endGame(){
        this.gameState = GAMESTATE.GAMEOVER;
    }

    update(dt){
        if(this.gameState === GAMESTATE.RUNNING){
            this.#gameObjects.forEach( go => go.update(dt));
            this.#gameObjects = this.#gameObjects.filter( go => !go.markedForDeletion );
            this.enemies.forEach( enemy => enemy.update(dt));
            this.enemies = this.enemies.filter( enemy => !enemy.markedForDeletion );

            if(this.enemies.length < 1 && this.score < this.levelScore){
                console.log('enemy refill fullfilled!');
                this.generateEnemies();
            }

            if(this.score >= this.levelScore){
                this.gameState = GAMESTATE.WON;
            }
        }
    }

    draw(ctx){
        if(this.gameState === GAMESTATE.RUNNING){
            this.#gameObjects.forEach( go => go.draw(ctx));
            this.enemies.forEach( enemy => enemy.draw(ctx));
            //console.log('done drawing ', this.#gameObjects.length, ' objects')
        }
        else if(this.gameState === GAMESTATE.GAMEOVER){
            this.#gameObjects.forEach( go => go.draw(ctx));
            drawGameOver(ctx, this);
        }
        else if(this.gameState === GAMESTATE.WON){
            drawGameWon(ctx, this);
        }
        else if(this.gameState === GAMESTATE.MENU){
            drawMenu(ctx, this);
        }
    }
}