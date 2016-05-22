AG.Menu = function(){};

WebFontConfig = {
  google: { families: [ 'Montserrat::latin' ] }
};

//buttonHelper object to helper manage button stuff
var buttonHelper = {
  durationOfAnim: 700,
  easeAnim: "Elastic",
  delayAim: 100,
  
  //what happens when play button is clicked
  startGame: function (){
    changeState("Map");
  },
  
  createButtons: function () {
    buttonHelper.playButton = game.add.button(game.world.centerX + 50, game.world.height + 50, "playButtonTemp",   buttonHelper.startGame, null, 1, 2, 3, 1);
    buttonHelper.playButton.anchor.setTo(0.5);
    buttonHelper.settingsButton = game.add.button(game.world.centerX + 50, game.world.height + 50, "settingsButtonTemp", null, null, 1, 2, 3, 1);
    buttonHelper.settingsButton.anchor.setTo(0.5);
    buttonHelper.creditsButton = game.add.button(game.world.centerX + 50, game.world.height + 50, "creditsButtonTemp", null, null, 1, 2, 3, 1);    
    buttonHelper.creditsButton.anchor.setTo(0.5);
    
    buttonHelper.playButton.events.onInputOver.add(buttonHelper.mouseOver, this);
    buttonHelper.settingsButton.events.onInputOver.add(buttonHelper.mouseOver, this);
    buttonHelper.creditsButton.events.onInputOver.add(buttonHelper.mouseOver, this);
    
    buttonHelper.playButton.events.onInputOut.add(buttonHelper.mouseLeave, this);
    buttonHelper.settingsButton.events.onInputOut.add(buttonHelper.mouseLeave, this);
    buttonHelper.creditsButton.events.onInputOut.add(buttonHelper.mouseLeave, this);
    
    buttonHelper.playButton.events.onInputDown.add(buttonHelper.mouseClick, this);
    buttonHelper.settingsButton.events.onInputDown.add(buttonHelper.mouseClick, this);
    buttonHelper.creditsButton.events.onInputDown.add(buttonHelper.mouseClick, this);
  },
  
  fixButtonPos: function () {
    buttonHelper.playButton.x = buttonHelper.playButton.x + buttonHelper.playButton.width;
    buttonHelper.settingsButton.x = buttonHelper.settingsButton.x + buttonHelper.settingsButton.width;
    buttonHelper.creditsButton.x = buttonHelper.creditsButton.x + buttonHelper.creditsButton.width;
  },
  
  tweenButtons: function () {
    game.add.tween(buttonHelper.playButton).to( { y: game.world.centerY/3 }, buttonHelper.durationOfAnim, buttonHelper.easeAnim, true, buttonHelper.delayAim);
    game.add.tween(buttonHelper.settingsButton).to( { y: game.world.centerY*2/3 }, buttonHelper.durationOfAnim, buttonHelper.easeAnim, true, buttonHelper.delayAim*2);
    game.add.tween(buttonHelper.creditsButton).to( { y: game.world.centerY }, buttonHelper.durationOfAnim, buttonHelper.easeAnim, true, buttonHelper.delayAim*3);
  },
  
  mouseOver: function (button) {
    game.add.tween(button.scale).to({ x: 1.2, y: 1.2}, 75, Phaser.Easing.Back.Out, true);
    sounds.mouseOver.play();
  }, //function mouseOver
  
  mouseLeave: function (button) {
    game.add.tween(button.scale).to({ x: 1, y: 1}, 75, Phaser.Easing.Back.IN, true);
  },  //function mouseLeave
  
  mouseClick: function (button) {
    sounds.mouseClick.play();
  }
};

//object to help with animations
var animHelper = {
  robFront: null
}

var sounds = {}

AG.Menu.prototype = {
  preload: function (){
    game.load.image("robFrontIMG", "../Assets/Sprites/robFront.png")
    
    game.load.spritesheet("creditsButtonTemp", "../Assets/Sprites/creditsButtonTemp.png", 314, 124);
    game.load.spritesheet("playButtonTemp", "../Assets/Sprites/playButtonTemp.png", 314, 125 );
    game.load.spritesheet("settingsButtonTemp", "../Assets/Sprites/settingsButtonTemp.png", 314, 127);
    
    game.load.audio("clickSound", "../Assets/Sounds/buttonClick.mp3");
    game.load.audio("mouseOverSound", "../Assets/Sounds/mouseOver.mp3");
    
    game.load.script("webFont", "//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js");
  },
	
  create: function(){
    console.log('You are in the Menu state');
    game.stage.backgroundColor = '#fff';
      
    animHelper.robFront = game.add.sprite(-50, 0, "robFrontIMG");
    
    //create buttons
    buttonHelper.createButtons();
    //fix button positions
    buttonHelper.fixButtonPos();
    //tween buttons
    buttonHelper.tweenButtons();
    
    sounds.mouseClick = game.add.audio("clickSound");
    sounds.mouseOver = game.add.audio("mouseOverSound");
    
    var titleText = game.add.text(780, 850, "Awesome Game", { font: 'bold 128px Montserrat', fill: '#000000' });

  },

  update: function(){

  }
};