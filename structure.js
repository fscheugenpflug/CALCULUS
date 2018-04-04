// Appendation of the FormELement 

Game.prototype.nextTurn = function(){
  var self = this;
  var interface = self.createNewForm();

  if (self.evaluateCorrect !== 0){
    self.createNewForm.remove();
  };
  self.divFormElement.appendChild(interface);
  self.setOperations();
  self.setResult();
};

//FormElement 

Game.prototype.createNewForm = function() {
  var self = this;
  self.formElement = document.createElement('form');
  self.formElement.setAttribute('id','input')

  function mainBody(){
    var inputElement1 = document.createElement('input');
    inputElement1.setAttribute('type','number');
    var divElement = document.createElement('div');
    divElement.setAttribute('class', 'operations');
    var inputElement2 = document.createElement('input');
    inputElement2.setAttribute('type','number');

    self.formElement.appendChild(inputElement1);
    self.formElement.appendChild(divElement);
    self.formElement.appendChild(inputElement2);
  };

  function addLevel(){
    var divElement = document.createElement('div');
    divElement.setAttribute('class', 'operations');
    var inputElement = document.createElement('input');
    inputElement.setAttribute('type','number');

    self.formElement.appendChild(divElement);
    self.formElement.appendChild(inputElement);
  };

  mainBody();
  if(self.evaluateCorrect > 0){
    for (idx = 1; idx <= self.evaluateCorrect; idx++){
      addLevel();
    };
  };
}


