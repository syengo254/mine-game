export function drawGameOver(ctx, game) {
    ctx.fillStyle = 'rgba(255, 255, 255, .9)';
    ctx.fillRect(0, 0, game.gameWidth, game.gameHeight);
    ctx.fillStyle = 'red';
    ctx.fillRect( 0, game.gameHeight / 2 - 20, game.gameWidth, 60);
    ctx.font = "bold 16px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", game.gameWidth / 2, game.gameHeight / 2 + 8);
    ctx.fillText("Points: " + game.score, game.gameWidth / 2, game.gameHeight / 2 + 25);
}

export function drawGameWon(ctx, game) {
    ctx.fillStyle = 'rgba(255, 255, 255, .9)';
    ctx.fillRect(0, 0, game.gameWidth, game.gameHeight);
    ctx.fillStyle = 'blue';
    ctx.fillRect( 0, game.gameHeight / 2 - 20, game.gameWidth, 60);
    ctx.font = "bold 16px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("WON!!", game.gameWidth / 2, game.gameHeight / 2 + 8);
    ctx.fillText("Points: " + game.score, game.gameWidth / 2, game.gameHeight / 2 + 25);
}

export function drawMenu(ctx, game) {
    ctx.fillStyle = 'rgba(0, 100, 255, 1)';
    ctx.fillRect(0, 0, game.gameWidth, game.gameHeight);
    ctx.fillStyle = 'orangered ';
    ctx.fillRect( 0, game.gameHeight / 2 - 20, game.gameWidth, 60);
    ctx.font = "bold 16px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("SPACE JET FIGHTER", game.gameWidth / 2, game.gameHeight / 2 + 5);
    ctx.fillText("Press SPACE to start!", game.gameWidth / 2, game.gameHeight / 2 + 30);
}