import Game from "./scripts/game";

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    const startButton = document.querySelector("start-button");
    
    startButton.addEventListener('click', () => {
        document.querySelector('#introduction').classList.add(hide);
        //document.querySelector('#instructions').classList.add(hide);
        game.gameStart();
    })

    document.getElementById('restart-button').addEventListener('click', () => {
        game.restart();
    })

})