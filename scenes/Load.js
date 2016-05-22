var AG = {};

//AG.SAVE = {
//  state: 'Shkreli',
//  currentWeapon: this.weapons.axe,
//  weapons: {
//    axe: {
//      type: 'melee',
//      key: 'robArmAxe',
//      damage: 10,
//      angleAdjust: 30
//    },
//    pistol: {
//      type: 'gun',
//      key: 'robArmPistol',
//      damage: 10,
//      angleAdjust: 0
//    }
//  }
//};

AG.Load = function(){};

AG.Load.prototype = {
  preload: function() {
    // load sprites
    game.load.image('robBody', '../Assets/Sprites/robBody.png');
    game.load.image('robArmAxe', '../Assets/Sprites/robArmAxe.png');
    game.load.image('robArmPistol', '../Assets/Sprites/robArmPistol.png');
    
    // load spritesheets
    
    // load backgrounds
    
    // load sounds
  },
  create: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    console.log('You are in the Load state');
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = game.scale.pageAlignVertically = true;
    game.time.events.add(100, function(){ changeState(AG.SAVE.state) });
  }
};

function changeState(state){
  game.state.start(state);
}