// Constructor GAME 

function Game (parentElement, difficulty){
  this.values = [];
  this.difficulty = difficulty;
  this.parentElement = parentElement;
  this.mathOperators = ['+','-','/','*'];
  this.ix;
  this.inputs = [];
  this.operationElement = [];
  this.result;
  this.elements = [];
  this.endCallback = null;
  this.gameScreenElement;
  this.currentLevel = 0;
  this.divFormElement;
  this.string = '';
  this.operationArray = [];
  this.inputsArray= [];
  this.widthHealthBarInitial = 100;

};

// Game Definition

Game.prototype.build = function(){
  var self = this;
  
  self.gameScreenElement = createHtml(`
  <div id="game-screen">
    <div id="health-bar"></div>
    <div id="form-Game">
    </div>
    <div class = "equal"><img src="images/equal.svg" alt="=" class="equal-img"></div>
    <div id="result"></div>
    <button id="check" class="button check">check</button>
    <!--<button class="over">Game Over</button>>
  </div>
  `);
  self.divFormElement = self.gameScreenElement.querySelector('#form-Game');
  self.resultElement = self.gameScreenElement.querySelector('#result');
  self.checkButtonElement = self.gameScreenElement.querySelector('#check');
  self.parentElement.appendChild(self.gameScreenElement);
  self.nextTurn();
  
  self.handleClick = function() {
    self.calculateFinal();
    self.evaluate();
  }
  self.checkButtonElement.addEventListener('click', self.handleClick);
  self.healthBarElem = self.gameScreenElement.querySelector('#health-bar')
  self.healthBar();
};

// Appendation of the FormELement 

Game.prototype.nextTurn = function(){
  var self = this;
  
  if (self.currentLevel !== 0){
    self.formElement.remove();
  };
  self.createNewForm();
  self.divFormElement.appendChild(self.formElement);
  self.createOperations();
  self.createResult();
  self.widthHealthBarInitial = 100;
};

//FormElement 

Game.prototype.createNewForm = function() {
  var self = this;
  self.formElement = document.createElement('form');
  self.formElement.setAttribute('id','input')
  
  function mainBody(){
    // self.healthBarElem  = document.createElement('div');
    // self.healthBarElem.setAttribute('id','health-bar')
    var inputElement1 = document.createElement('input');
    inputElement1.setAttribute('type','number');
    inputElement1.setAttribute('class','input-game-screen');
    var divElement = document.createElement('div');
    divElement.setAttribute('class', 'operations');
    var inputElement2 = document.createElement('input');
    inputElement2.setAttribute('type','number');
    inputElement2.setAttribute('class','input-game-screen');

    // self.formElement.appendChild(self.healthBarElem);
    self.formElement.appendChild(inputElement1);
    self.formElement.appendChild(divElement);
    self.formElement.appendChild(inputElement2);
  };

  mainBody()
  if(self.currentLevel > 0){
    for (idx = 1; idx <= self.currentLevel; idx++){
      addLevel();
    };
  };

  function addLevel(){
    var divElement = document.createElement('div');
    divElement.setAttribute('class', 'operations');
    var inputElement = document.createElement('input');
    inputElement.setAttribute('type','number');
    inputElement.setAttribute('class','input-game-screen');

    self.formElement.appendChild(divElement);
    self.formElement.appendChild(inputElement);
  };
}

Game.prototype.healthBar = function() {
  var self = this;
  var id = setInterval(frame, 100); // depends on the time the player will have 
  function frame() {
    if (self.widthHealthBarInitial <= 1) {
      clearInterval(id);
      self.endCallback();
    } else {
      self.widthHealthBarInitial -- ; 
      self.healthBarElem.style.width = self.widthHealthBarInitial + '%'; 
    }
  }
}

Game.prototype.calculateFinal = function (inputs, operations){
  var self = this;
  self.inputs = self.formElement.querySelectorAll('input');
  for (var idx = 0; idx < self.inputs.length; idx ++){
    var value = self.inputs[idx].value;
    self.inputsArray.push(value);
  };

  for(var idy = 0; idy < self.inputsArray.length; idy++)  {
    if(idy < self.operationArray.length){
      self.string += self.inputsArray[idy] + self.operationArray[idy];
    } else {  
      self.string += self.inputsArray[idy];
    };
  };
  
};

Game.prototype.evaluate = function() {
  var self = this;
  var isValidOperation = true 

  for (var idx=0; idx < self.inputsArray.length; idx++){
    if (self.inputsArray[idx] == ''){
      alert ('Numbers missing');
      isValidOperation =  false;
    };
  };

  if(isValidOperation){
    var evaluation = eval(self.string)
  };
  
  if (evaluation === self.result && isValidOperation){
    self.currentLevel ++;
    self.operationArray = [];
    self.nextTurn(); 
  } else if (isValidOperation) {
      alert ('YOU SUCK AT MATHS! TRY AGAIN');
    } 
   

  if (self.currentLevel === 3){
    self.endCallback();
  };
  self.inputsArray =[];
  self.string ='';
};

Game.prototype.createOperations = function (){
  var self = this;
  self.operationElement = self.gameScreenElement.querySelectorAll('.operations');

  for (var idx = 0; idx < self.operationElement.length; idx++){
    var ix = Math.floor(Math.random()*4);

    self.operation = self.mathOperators[ix]; 
    self.operationElement[idx].innerText = self.operation;
    self.operationArray.push(self.operation);
};
}

Game.prototype.createResult = function (){
  var self =  this;
  self.result = Math.floor(Math.random()*Number(self.difficulty));
  if (self.result === 0){
    self.result = self.result + 1;
  } else {
    self.result
  };
  self.resultElement.innerText = self.result;
}
  
Game.prototype.onEnded = function(callback){
  var self = this;

  self.endCallback = callback;
  // self.gameOverButton = self.gameScreenElement.querySelector('.over');
  // self.gameOverButton.addEventListener('click', self.endCallback);
};

Game.prototype.destroy = function() {
  var self = this;

  // self.gameOverButton.removeEventListener('click', self.endCallback);
  self.checkButtonElement.removeEventListener('click', self.handleClick);
  self.gameScreenElement.remove()
};

