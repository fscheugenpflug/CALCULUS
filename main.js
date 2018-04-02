// -- OVERALL
function createHtml(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
};


function main() {
  var mainContentElement = document.getElementById('main-content');

  // -- TITLE SCREEN

  var titleScreenElement;
  var startButtonElement;

  
  function buildTitleScreen() {
    titleScreenElement = createHtml(`<div id="start-screen">
    <h1>Calculus</h1>
    <button class="button start-game">Start Game</button>
    </div>`);
    mainContentElement.appendChild(titleScreenElement);
    startButtonElement = titleScreenElement.querySelector('button');
    startButtonElement.addEventListener('click', handleStartClick);
  }
  
  function destroyTitleScreen() {
    titleScreenElement.remove();
    startButtonElement.removeEventListener('click', handleStartClick);
  }
  
  function handleStartClick() {
    destroyTitleScreen();
    buildGameScreen();
  };

  // -- GAME SCREEN 

  var game;

  function gameEnded(){
    destroyGameScreen();
    buildGameOverScreen();
  }
  
  function buildGameScreen() {
    gameScreenElement = createHtml(`<form id="input">
    <input type="number" class="input-number-1">
    <div class="operation operation1">+</div>
    <input type="number" class="input-number-2">
    <div id="result">24</div>
    <button>check</button>
    <!-- ¿¿¿¿ <input type="submit" value="Submit"> ???? -->
  </form>`);
    // game = new Game (mainContentElement);
    // game.build();
    // game.start();
    mainContentElement.appendChild(gameScreenElement);
    window.setTimeout(gameEnded, 1000);
  }

  function destroyGameScreen() {
    gameScreenElement.remove();
  }

  // -- GAMEOVER SCREEN 

  function buildGameOverScreen() {
    gameOverScreenElement = createHtml(`<div id="restart-screen">
    <h1>GameOver</h1>
    <button class="buttton restart-game">Restart Game</button>
  </div>`);
    mainContentElement.appendChild(gameOverScreenElement);
    restartGameButtonElement = gameOverScreenElement.querySelector('button');
    restartGameButtonElement.addEventListener('click', handleRestartClick);
  }

  function handleRestartClick() {
    destroyGameOverScreen();
    buildGameScreen();
  }
  function destroyGameOverScreen() {
    gameOverScreenElement.remove();
    restartGameButtonElement.removeEventListener('click', handleRestartClick);
  }
  // -- START THE APP

  buildTitleScreen();
  }
window.addEventListener('load', main);