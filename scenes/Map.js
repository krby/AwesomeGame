AG.Map = function () {};
  
var colliding;

var textStuff = {
  commandText: null,
  createText: function () {
    textStuff.commandText = game.add.text(game.camera.width/2, 650, "<SPACE> TO INTERACT ", { font: '64px Arial', fill: '#ffffff' });
    textStuff.commandText.x = game.camera.width/2 - textStuff.commandText.width/2
    textStuff.commandText.fill = "white";
  },
  
  overlapping: function () {
    console.log('colliding')
  }

}

//player object to help manage player stuff
var playerStuff = {
  speed: 500,
  scale: 0.2,
  //called when WASD to move sprite
  move: function (key, direction) {
    //directions: 1 = up,   2 = left,   3 = down,   4 = right
    if (direction == 1){
      //move up
      playerStuff.player.body.velocity.y = playerStuff.speed * - 1;
      playerStuff.player.body.velocity.x = 0;
      //change image to face direction of movement
      playerStuff.player.loadTexture("robBackIMG");
      playerStuff.player.scale.x = playerStuff.scale;
    } else if (direction == 2) {
      //move left
      playerStuff.player.body.velocity.x = playerStuff.speed * - 1;
      playerStuff.player.body.velocity.y = 0;
      //change image to face direction of movement
      playerStuff.player.loadTexture("robSideIMG");
      playerStuff.player.scale.x = - playerStuff.scale;
    } else if (direction == 3) {
      //move down
      playerStuff.player.body.velocity.y = playerStuff.speed;
      playerStuff.player.body.velocity.x = 0;
      //change image to face direction of movement
      playerStuff.player.loadTexture("robFrontIMG");
      playerStuff.player.scale.x = playerStuff.scale;
    } else {
      //move right
      playerStuff.player.body.velocity.x = playerStuff.speed;
      playerStuff.player.body.velocity.y = 0;
      //change image to face direction of movement
      playerStuff.player.loadTexture("robSideIMG");
      playerStuff.player.scale.x = playerStuff.scale;
    } //else 
    
    sounds.robotMovingSound.play();
  } //move function
}; //playerStuff Object

//map object to help manage map stuff
var mapStuff = {
  mapScale: 1,
  map: null, 
  
  //help manage all buildings in game
  buildingStuff: {
    //help manage all generic buildings
    genericBuildingStuff: {
      genericBuidlingArray: [],
      //create generric buildings
      createGenericBuildings: function () {
        for (var i = 0; i < 6; i ++){
          var genericBuidling = game.add.sprite(
            //get coords to spawn genericBuidling
            mapStuff.buildingStuff.genericBuildingStuff.getGenericBuildingStuff(1, i),
            mapStuff.buildingStuff.genericBuildingStuff.getGenericBuildingStuff(2, i),
            "genericBuildingIMG");
          //get scale
          genericBuidling.scale.x = mapStuff.buildingStuff.genericBuildingStuff.getGenericBuildingStuff(3, i);
          genericBuidling.scale.y = mapStuff.buildingStuff.genericBuildingStuff.getGenericBuildingStuff(4, i);

          game.physics.enable(genericBuidling);
          mapStuff.buildingStuff.genericBuildingStuff.genericBuidlingArray.push(genericBuidling);

          genericBuidling.body.immovable = true;
          genericBuidling.body.moves = false;
        } //for 
      }, //function create generic buidlings

      //hold all coordinates for generic buildings
      genericBuildingStuff: {
        coordsX: [130, 980, 550, 1450, 150, 1430],
        coordsY: [200, 200, 750, 750, 1410, 1400],
        scaleX: [0.5, 0.5, 0.5, 0.5, 0.4, 0.5],
        scaleY: [0.5, 0.5, 0.6, 0.6, 0.5, 0.5]
      },  //object genericBuildingCoords

      //return coordinates of all generic buildings
      getGenericBuildingStuff: function (numXY, numToSet) {
        if (numXY == 1){
          //return x stuff
          return mapStuff.buildingStuff.genericBuildingStuff.genericBuildingStuff.coordsX[numToSet];
        } else if (numXY == 2){
          return mapStuff.buildingStuff.genericBuildingStuff.genericBuildingStuff.coordsY[numToSet];
        } else if (numXY == 3){
          //return scale stuff
          return mapStuff.buildingStuff.genericBuildingStuff.genericBuildingStuff.scaleX[numToSet];
        } else if (numXY == 4){
          return mapStuff.buildingStuff.genericBuildingStuff.genericBuildingStuff.scaleY[numToSet]; 
        } //else if
      } //function getGenericBuildingCoords 
    }, //object genericBuildingStuff
    //help manage all special buildings 
    specialBuildingStuff: {
      specialBuildingArray: [],
      
      createSpecialBuildings: function () {
        mapStuff.buildingStuff.specialBuildingStuff.blackMarketBuilding = game.add.sprite(1500, 250, "blackMarketIMG");
        mapStuff.buildingStuff.specialBuildingStuff.blackMarketBuilding.scale.x = 0.3;
        mapStuff.buildingStuff.specialBuildingStuff.blackMarketBuilding.scale.y = 0.3;
        mapStuff.buildingStuff.specialBuildingStuff.specialBuildingArray.push(mapStuff.buildingStuff.specialBuildingStuff.blackMarketBuilding);
        game.physics.enable( mapStuff.buildingStuff.specialBuildingStuff.blackMarketBuilding);

        mapStuff.buildingStuff.specialBuildingStuff.blackMarketBuilding.body.immovable = true;
        mapStuff.buildingStuff.specialBuildingStuff.blackMarketBuilding.body.moves = false;
        
        mapStuff.buildingStuff.specialBuildingStuff.newsStand = game.add.sprite(470, 1425, "newsStandIMG");
        mapStuff.buildingStuff.specialBuildingStuff.newsStand.scale.x = 0.4;
        mapStuff.buildingStuff.specialBuildingStuff.newsStand.scale.y = 0.4;
        mapStuff.buildingStuff.specialBuildingStuff.specialBuildingArray.push(mapStuff.buildingStuff.specialBuildingStuff.newsStand);
        game.physics.enable( mapStuff.buildingStuff.specialBuildingStuff.newsStand);

        mapStuff.buildingStuff.specialBuildingStuff.newsStand.body.immovable = true;
        mapStuff.buildingStuff.specialBuildingStuff.newsStand.body.moves = false;
        
      } //function createSpecialBuildings
    } //object specialBuildings
  } //object buildingStuff
  
} //mapStuff Object

AG.Map.prototype = {
  preload: function () {
    game.load.image("robFrontIMG", "../Assets/Sprites/robEagle.png");
    game.load.image("robSideIMG", "../Assets/Sprites/robSide.png");
    game.load.image("robBackIMG", "../Assets/Sprites/robBack.png");
    game.load.image("mapIMG", "../Assets/Sprites/map.png");
    
    game.load.image("genericBuildingIMG", "../Assets/Sprites/genericBuilding.png");
    game.load.image("blackMarketIMG", "../Assets/Sprites/blackMarket.png");
    game.load.image("newsStandIMG", "../Assets/Sprites/newStand.png");
    
    game.load.audio("robotMovingSound", "../Assets/Sounds/carDriving.mp3")
  },
  
  create: function(){
    console.log('You are in the Map state');
    game.stage.backgroundColor = '#0000FF';
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.world.setBounds(0, 0, 2048, 2048);
    
    mapStuff.map = game.add.sprite (0, 0, "mapIMG");
    mapStuff.map.scale.x = mapStuff.mapScale;
    mapStuff.map.scale.y = mapStuff.mapScale;
     
    playerStuff.player = game.add.sprite (game.camera.width/2, game.camera.height/2, "robFrontIMG");
    playerStuff.player.scale.x = playerStuff.scale;
    playerStuff.player.scale.y = playerStuff.scale;
    playerStuff.player.anchor.x = 0.5;  
    playerStuff.player.anchor.y = 0.5;
    game.physics.enable(playerStuff.player);
    playerStuff.player.body.collideWorldBounds = true;
    
    game.camera.follow(playerStuff.player)
    game.camera.deadzone = new Phaser.Rectangle(game.camera.width/2, game.camera.height/2, 150, 150)
    
    //create  buidlings
    mapStuff.buildingStuff.genericBuildingStuff.createGenericBuildings();
    mapStuff.buildingStuff.specialBuildingStuff.createSpecialBuildings();
    
    //create text
    textStuff.createText();
    textStuff.commandText.visible = false;
    
    sounds.robotMovingSound = game.add.audio("robotMovingSound");

  },
  update: function(){
    //WASD keys to do stuff
    game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(playerStuff.move, null, null, 1);
    game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(playerStuff.move, null, null, 2);
    game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(playerStuff.move, null, null, 3);
    game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(playerStuff.move, null, null, 4);
    
    //if no buttons are pressed, dont move
    if (!game.input.keyboard.isDown(Phaser.Keyboard.W) && 
        !game.input.keyboard.isDown(Phaser.Keyboard.A) &&
        !game.input.keyboard.isDown(Phaser.Keyboard.S) && 
        !game.input.keyboard.isDown(Phaser.Keyboard.D)) {
      playerStuff.player.body.velocity.x = 0;
      playerStuff.player.body.velocity.y = 0;
      sounds.robotMovingSound.stop();
    } //if buttons not pressed
    
    //building collision
    for (var i = 0; i <= mapStuff.buildingStuff.genericBuildingStuff.genericBuidlingArray.length; i++) {
      game.physics.arcade.collide(mapStuff.buildingStuff.genericBuildingStuff.genericBuidlingArray[i], playerStuff.player);  
    } //for building collision
    for (var i = 0; i <= mapStuff.buildingStuff.specialBuildingStuff.specialBuildingArray.length; i++){
      game.physics.arcade.collide(mapStuff.buildingStuff.specialBuildingStuff.specialBuildingArray[1], playerStuff.player);
    } //for buidling collision
    
    []
    //ugly code for now, will fix later
    //do stuff to switch states in the textStuff.overlapping
    game.physics.arcade.collide(mapStuff.buildingStuff.specialBuildingStuff.specialBuildingArray[0], playerStuff.player, textStuff.overlapping, null, this);  

    game.physics.arcade.collide(playerStuff.player, mapStuff.buildingStuff.genericBuildingStuff.genericBuidlingArray[0], function() {
      game.state.start('Shkreli');
    });
  } //function update
};