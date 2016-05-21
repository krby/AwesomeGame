AG.Shkreli = function(){};

var robBody, robArm, centerX;

AG.Shkreli.prototype = {
  create: function(){
    console.log('You are in the Shkreli state');
    game.stage.backgroundColor = '#fff';
    
    robBody = game.add.sprite(10, 10, 'robBody');
    robBody.anchor.setTo(0.5);
  },
  update: function(){

  }
};

