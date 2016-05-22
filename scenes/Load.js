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
    game.load.image('axe', '../Assets/Sprites/axe.png');
    game.load.image('machete', '../Assets/Sprites/machete.png');
    game.load.image('pistol', '../Assets/Sprites/pistol.png');
    game.load.image('rocketLauncher', '../Assets/Sprites/rocketLauncher.png');
    game.load.image('shotgun', '../Assets/Sprites/shotgun.png');
    game.load.image('bullet', '../Assets/Sprites/bullet.png');
    game.load.image('slug', '../Assets/Sprites/slug.png');
    game.load.image('rocket', '../Assets/Sprites/rocket.png');
    game.load.image('orangeBullet', '../Assets/Sprites/orangeBullet.png');
    game.load.image('damage', '../Assets/Sprites/damage.png');
    game.load.image('trump', '../Assets/Sprites/trump.png');
    
    // load spritesheets
    
    // load backgrounds
    game.load.image('floor', '../Assets/Backgrounds/floor.png');
    
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