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
  var difficulty = null;
  var startButtonElement;

  
  function buildTitleScreen() {
    titleScreenElement = createHtml(`<div id="start-screen">
    <h1>Calculus</h1>
    <div class="box">
	    <a class="button-popup" href="#popup1">Instructions</a>
    </div>
    <div class="box">
      <a class="button-popup" href="#popup2">Set difficulty</a>
    </div>
    <div id="popup1" class="overlay">
      <div class="popup">
        <h2>Instructions</h2>
        <a class="close" href="#">&times</a>
        <div class="content">
          The aim is to evaluate the mathematical equation correctly <br>
          <ul> 
          <li>to do so you will need to insert several numbers.</li>
          <li>only if the numbers are correct you will reach the next level! </li>
          <li>but be aware <span>THE CLOCK IS TICKING!</span></li>
        </div>
      </div>
    </div>
    <div id="popup2" class="overlay">
      <div class="popup">
        <h2>Set difficulty</h2>
        <a class="close" href="#">&times</a>
        <div class="content">
          By inserting a number below, you will be able to set the range of the game!
        </div>
        <input type="number" class="range">
        </input>
      </div>
    </div>
    <button class="button start-game">Start Game</button>
    </div>`);
    mainContentElement.appendChild(titleScreenElement);
    startButtonElement = titleScreenElement.querySelector('button');
    startButtonElement.addEventListener('click', handleStartClick);
  }
  
  function destroyTitleScreen() {
    difficulty;
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
    window.setTimeout(destroyCountDownScreen, 2800);
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
    game = new Game (mainContentElement, difficulty);
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