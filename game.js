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
      <button class="check">check</button>
      <button class="over">Game Over</button>
      <form id="input">
        <input type="number" class="input-number-1">
        <div class="operation operation-1"></div>
        <input type="number" class="input-number-2">
        <div id="result"></div>
      </form>
    </div>
    `);

  self.parentElement.appendChild(self.gameScreenElement);
  self.checkButtonElement = self.gameScreenElement.querySelector('.check');
}
Game.prototype.start = function (){
  
  var self = this;
  var resultElement = self.gameScreenElement.querySelector('#result');
  var operationElement = self.gameScreenElement.querySelector('.operation-1');
  
  self.result = Math.floor(Math.random()*10)
  var ix = Math.floor(Math.random()*4);
  self.operation = self.mathOperators[ix];
  resultElement.innerText = self.result; 
  operationElement.innerText = self.operation;

  self.bindingButton();
  
};

Game.prototype.bindingButton = function() {
  
  var self = this;
  
  self.evaluate = function(){
    var inputOne = self.gameScreenElement.querySelector('.input-number-1').value;
    var inputTwo = self.gameScreenElement.querySelector('.input-number-2').value;
    if ((inputOne && inputTwo)=== ''){
      alert ('Numbers missing');
    } else {
    var evaluation = eval(inputOne + self.operation + inputTwo);
    };
    
    if (evaluation === self.result){
      self.endCallback();
    } else {
      // alert ('YOU SUCK AT MATHS! TRY AGAIN');
    };
  }
 
  self.checkButtonElement.addEventListener('click', self.evaluate);
}

Game.prototype.onEnded = function(callback){
  var self = this;
  self.endCallback = callback;
  self.gameOverButton = self.gameScreenElement.querySelector('.over');
  self.gameOverButton.addEventListener('click', self.endCallback);
};

Game.prototype.destroy = function() {
  var self = this;
  self.gameOverButton.removeEventListener('click', self.endCallback);
  self.checkButtonElement.removeEventListener('click', self.evaluate);
  self.gameScreenElement.remove()
}