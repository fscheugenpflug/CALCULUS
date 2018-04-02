// Constructor GAME 

function Game (parentElement){
  this.values = [];
  this.parentElement = parentElement;
  this.mathOperators = ['+','-','/','*'];
  this.ix;
  this.operation;
  this.result;
  this.elements = [];
  this.endCallback = null;
  this.gameScreenElement;
};

// Game Definition

Game.prototype.build = function(){
  var self = this;
  self.gameScreenElement = createHtml(`
    <div id="game-screen">
      <button>check</button>
      <form id="input">
        <input type="number" class="input-number-1">
        <div class="operation operation1">+</div>
        <input type="number" class="input-number-2">
        <div id="result">24</div>
      </form>
    </div>
    `);
  self.parentElement.appendChild(self.gameScreenElement)
  }




// Game.prototype.buildGame = function (range){
//   var self = this
//   self.result = Math.floor(Math.random()*result)
//   self.ix = Math.floor(Math.random()*4);
//   self.operation = self.mathOperators[self.ix];
// };

// Game END

Game.prototype.onEnded = function (callback){
  var self = this;
  self.endCallback = callback;
  self.checkButton = self.gameScreenElement.querySelector('button');
  self.checkButton.addEventListener('click', onEnded);
};