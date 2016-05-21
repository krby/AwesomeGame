var AG = {};

AG.SAVE = {
  state: 'Shkreli'
};

AG.Load = function(){};

AG.Load.prototype = {
  preload: function() {
    // load sprites
    game.load.image('robBody', '../Assets/Sprites/robBody.png');
    game.load.image('robArm', '../Assets/Sprites/robArm.png');
    
    // load spritesheets
    
    // load backgrounds
    
    // load sounds
  },
  create: function(){
    console.log('You are in the Load state');
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = game.scale.pageAlignVertically = true;
    game.time.events.add(100, function(){ changeState(AG.SAVE.state) });
  }
};

function changeState(state){
  game.state.start(state);
}