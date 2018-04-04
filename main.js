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
    //buildGameScreen();
    buildCountDownScreen();
  };

  // -- COUNTDOWN-SCREEN

  function buildCountDownScreen(){
    countDownScreenElement = createHtml(`<div class="countdown">
    <img src="https://thumbs.gfycat.com/RepentantFancyAlbatross-size_restricted.gif">
  </div>`)
    mainContentElement.appendChild(countDownScreenElement);
    window.setTimeout(destroyCountDownScreen, 10);
  };

  function destroyCountDownScreen(){
    countDownScreenElement.remove();
    buildGameScreen();
  }
  // -- GAME SCREEN 

  var game;

  function gameEnded(){
    destroyGameScreen();
    buildGameOverScreen();
  }
  
  function buildGameScreen() {
    game = new Game (mainContentElement);
    game.build();  
    game.onEnded(gameEnded);

  }

  function destroyGameScreen() {
    game.destroy()
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