import Game from "./src/game.js";

const GAME_WIDTH = 600;
const GAME_HEIGHT = 450;

const game = new Game(GAME_WIDTH, GAME_HEIGHT);
const canvas = document.getElementById('stage');
const ctx = canvas.getContext("2d");

function mainLoop(dt){
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.update(dt);
    game.draw(ctx);

    requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);