var AG = {};

AG.SAVE = {
  state: 'Menu'
};

AG.Load = function(){};

AG.Load.prototype = {
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