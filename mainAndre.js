'use strict'

function createHtml(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}


function main() {
  var mainContentElement = document.getElementById('main-content');

  // -- TITLE SCREEN

  var titleScreenElement;
  var startButtonElement;

  function handleStartClick() {
    destroyTitleScreen();
    buildGameScreen();
  }

  function buildTitleScreen() {
    titleScreenElement = createHtml(``);
    mainContentElement.appendChild(titleScreenElement);
    startButtonElement = titleScreenElement.querySelector('button');
    startButtonElement.addEventListener('click', handleStartClick);
  }

  function destroyTitleScreen() {
    titleScreenElement.remove();
    startButtonElement.removeEventListener('click', handleStartClick);
  }


  // -- GAME SCREEN

  var game;

  var gameScreenElement;
  // var upButtonElement;
  // var downButtonElement;

  function gameEnded() {
    destroyGameScreen();
    buildGameOverScreen();
  }

  function buildGameScreen() {
    game = new Game(mainContentElement);
    game.build();
    // game.start();
    game.onEnded(gameEnded);
  }

  function destroyGameScreen() {
    gameScreenElement.remove();
  }

  // -- GAME OVER SCREEN

  var gameOverScreenElement;
  var restartGameButtonElement;

  function handleRestartClick() {
    destroyGameOverScreen();
    buildGameScreen();
  }

  function buildGameOverScreen() {
    gameOverScreenElement = createHtml(`<div class="game-over-screen">
      <h1>Score: 55</h1>
      <button>restart game</button>
    </div>`);
    mainContentElement.appendChild(gameOverScreenElement);
    restartGameButtonElement = gameOverScreenElement.querySelector('button');
    restartGameButtonElement.addEventListener('click', handleRestartClick);
  }

  function destroyGameOverScreen() {
    gameOverScreenElement.remove();
    restartGameButtonElement.removeEventListener('click', handleRestartClick);
  }

  // -- start the app

  buildTitleScreen();
}

window.addEventListener('load', main);