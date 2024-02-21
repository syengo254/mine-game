import { GAMESTATE } from "./game.js";

export default class InputHandler {
    constructor(player, game){
        document.addEventListener('keydown', (event) => {
            switch(event.key){
                // case "ArrowUp": {
                    
                // }
                // case "ArrowDown": {

                // }
                case "ArrowLeft": {
                    player.moveLeft();
                    break;
                }
                case "ArrowRight": {
                    player.moveRight();
                    break;
                }
                case "Escape": {
                    game.togglePause();
                    break;
                }
                case " ": {
                    if(game.gameState == GAMESTATE.MENU){
                        game.start();
                    }
                    else if(game.gameState == GAMESTATE.RUNNING){
                        if(!player.firing){
                            player.fire();
                        }
                    }
                    else{
                        
                    }
                    break;
                }
                case "x": {
                    if(game.gameState === GAMESTATE.GAMEOVER || game.gameState === GAMESTATE.WON){
                        game.restart();
                    }
                }
                default:
                    return;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch(event.key){
                case "ArrowLeft": {
                    if (player.speed < 0) player.stop();
                    break;
                }
                case "ArrowRight": {
                    if(player.speed > 0) player.stop();
                    break;
                }
                case " ": {
                    if(player.firing) player.firing = false;
                }
                default:
                    return;
            }
        });
    }
}