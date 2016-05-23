AG.Shkreli = function(){};
    
var centerX = 925, centerY = 500, gravity = 5000, meleeLeftTween, meleeRightTween, gunTween, bullets, floor, bullet, damage, enemy, enemies;

AG.SAVE = {
  state: 'Shkreli',
  weapons: [
    {
      type: 'melee',
      names: 'Axe',
      key: 'axe',
      damage: 40,
      atkRate: 5,
      angleAdjusts: {
        right: -70,
        left: -110
      },
      anchor: {
        x: 0.137,
        y: 0.108
      }
    },
    {
      type: 'melee',
      names: 'Machete',
      key: 'machete',
      damage: 50,
      atkRate: 8,
      angleAdjusts: {
        right: -20,
        left: -160
      },
      anchor: {
        x: 0.072,
        y: 0.761
      }
    },
    {
      type: 'gun',
      name: 'Pistol',
      key: 'pistol',
      bullet: 'bullet',
      damage: 70,
      atkRate: 8,
      reloadRate: 7,
      angleAdjusts: {
        right: 4,
        left: 176
      },
      anchor: {
        x: 0.077,
        y: 0.38
      }
    },
    {
      type: 'gun',
      name: 'Shotgun',
      key: 'shotgun',
      bullet: 'slug',
      damage: 80,
      atkRate: 4,
      angleAdjusts: {
        right: 4,
        left: 176
      },
      anchor: {
        x: 0.071,
        y: 0.498
      }
    },
    {
      type: 'gun',
      name: 'Rocket Launcher',
      key: 'rocketLauncher',
      bullet: 'rocket',
      damage: 120,
      atkRate: 2,
      angleAdjusts: {
        right: 4,
        left: 176
      },
      anchor: {
        x: 0.061,
        y: 0.657
      }
    }
  ]
};

var rob = {
  body: null,
  arm: null,
  speed: 500,
  jetPackSpeed: 8000,
  currentWeapon: AG.SAVE.weapons[0],
  nextAtk: null
}

AG.Shkreli.prototype = {
  create: function(){
    game.world.setBounds(0, 0, 2800, 1000);
    console.log('You are in the Shkreli state');
    game.stage.backgroundColor = '#fff';
    
    rob.body = game.add.sprite(centerX, centerY, 'robBody');
    norm(rob.body, 0.3, 0.5, 0.3);
    rob.arm = game.add.sprite(rob.body.x, rob.body.y - 40, rob.currentWeapon.key);
    norm(rob.arm, 0.3, rob.currentWeapon.anchor.x, rob.currentWeapon.anchor.y);
    game.camera.follow(rob.body);
    game.camera.deadzone = new Phaser.Rectangle(925 - 100, 0, 200, 1000);
    
    floor = game.add.sprite(0, 1000, 'floor');
    floor.anchor.y = 1;
    
    enemy = game.add.sprite(2100, 500, 'trump');
    norm(enemy);
    enemy.health = 1000;
    
    
    
    game.physics.enable([rob.arm, rob.body, floor, enemy]);
    
    rob.body.body.gravity.y = gravity;
    rob.body.body.collideWorldBounds = true;
    rob.body.body.drag.x = 2000;
    rob.body.body.bounce.y = 0.3;
    
    floor.body.immovable = true;
    
    enemy.body.gravity.y = gravity;
    enemy.body.collideWorldBounds = true;

//    game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(moveHorizontally, null, null, -1);
//    game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(moveHorizontally, null, null, 1);
    game.input.keyboard.addKey(Phaser.Keyboard.Q).onDown.add(toggleWeapons, null, null, -1);
    game.input.keyboard.addKey(Phaser.Keyboard.E).onDown.add(toggleWeapons, null, null, 1);
    game.input.onDown.add(attack);
    
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    
    damage = game.add.group();
    damage.createMultiple(1000, 'damage');
    
//    enemies = game.add.group();
//    enemies.createMultiple(2, 'trump');
//    enemies.setAll('anchor.x', 0.5);
//    enemies.setAll('anchor.y', 0.5);
//    enemies.setAll('body.gravity.y', gravity);
//
//    for (var i = 0; i < 2; i++) {
//      enemies.getFirstDead().reset(2000 + (i * 430), 600);
//    }

    meleeRightTween = meleeLeftTween = gunTween = game.add.tween();
  },
  update: function(){
    rob.arm.x = rob.body.x;
    rob.arm.y = rob.body.y;
    if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
      rob.body.body.velocity.x = rob.speed;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
      rob.body.body.velocity.x = -rob.speed;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
      rob.body.body.acceleration.y = -rob.jetPackSpeed;
    } else {
      rob.body.body.acceleration.y = 0;
    }
    
    if (inputLeft()) {
      rob.currentWeapon.angleAdjust = rob.currentWeapon.angleAdjusts.left;
      rob.body.scale.x = -0.3
      rob.arm.scale.x = -0.3
    } else {
      rob.currentWeapon.angleAdjust = rob.currentWeapon.angleAdjusts.right;
      rob.body.scale.x = 0.3
      rob.arm.scale.x = 0.3
    }
//    rob.arm.rotation = game.physics.arcade.angleToPointer(rob.arm) + rob.currentWeapon.angleAdjust;
    rob.arm.angle = angleToPointer(rob.arm) + rob.currentWeapon.angleAdjust;
    game.physics.arcade.collide([rob.body, enemy], floor);
    game.physics.arcade.collide([rob.body, rob.arm], enemy);
    game.physics.arcade.overlap(bullets, enemy, shootEnemy);
    game.physics.arcade.overlap(bullets, floor, shootFloor);
  }
};


function shootFloor() {
  if (bullet.y > 880) {
    var dam = damage.getFirstDead();
    dam.anchor.setTo(0.5, 0);
    dam.reset(bullet.x, bullet.y);
    bullet.kill();
  }
}

function shootEnemy() {
  enemy.health -= rob.currentWeapon.damage;
  game.add.tween(enemy).to({tint: 16724787}, 200, 'Linear', true);
  game.add.tween(enemy).to({tint: 16777215}, 200, 'Linear', true, 100);
  
  bullet.kill();
  if (enemy.health <= 0) {
    enemy.kill();
  }
}

function meleeEnemy() {
//  if (meleeRightTween.isRunning || meleeLeftTween.isRunning) {
//    enemy.health -= (rob.currentWeapon.damage / 100)
//  }
  
  game.add.tween(enemy).to({tint: 16724787}, 200, 'Linear', true);
  game.add.tween(enemy).to({tint: 16777215}, 200, 'Linear', true, 100);
  if (Phaser.Rectangle.intersects(rob.arm.getBounds(), enemy.getBounds())) {
    enemy.health -= rob.currentWeapon.damage;
  }
}

function toggleWeapons(e, direction) {
  var tween = inputLeft() ?
      game.add.tween(rob.arm).from({angle: '+360'}, 200, 'Linear', true) :
      game.add.tween(rob.arm).from({angle: '-360'}, 200, 'Linear', true);
  
  if (inputLeft()) {
    game.add.tween(rob.arm.scale).to({x: -0.2}, 100, 'Linear', true);
  } else {
    game.add.tween(rob.arm.scale).to({x: 0.2}, 100, 'Linear', true);
  }
    game.add.tween(rob.arm.scale).to({y: 0.2}, 100, 'Linear', true);
  tween.onComplete.add(function() {
  var index = AG.SAVE.weapons.indexOf(rob.currentWeapon)
  index += 1 * direction;
  if (index < 0) {
    index = AG.SAVE.weapons.length - 1;
  } else if (index >= AG.SAVE.weapons.length) {
    index = 0;
  }
  rob.currentWeapon = AG.SAVE.weapons[index];
  rob.arm.destroy();
  rob.arm = game.add.sprite(rob.body.x, rob.body.y - 40, rob.currentWeapon.key);
  norm(rob.arm, 0.3, rob.currentWeapon.anchor.x, rob.currentWeapon.anchor.y);
  if (inputLeft()) {
    rob.arm.scale.setTo(-0.3, 0.3);
    game.add.tween(rob.arm.scale).from({x: -0.2}, 100, 'Linear', true);
    game.add.tween(rob.arm.scale).from({y: -0.2}, 100, 'Linear', true);
  } else {
    rob.arm.scale.setTo(0.3);
    game.add.tween(rob.arm.scale).from({x: 0.2}, 100, 'Linear', true);
    game.add.tween(rob.arm.scale).from({y: 0.2}, 100, 'Linear', true);
  }
  console.log('creating multiple', rob.currentWeapon.bullet);
  bullets.removeAll();
  bullets.createMultiple(50, rob.currentWeapon.bullet);
  bullets.setAll('checkWorldBounds', true);
  bullets.setAll('outOfBoundsKill', true);
  bullets.setAll('anchor.x', 0.5);
  bullets.setAll('anchor.y', 0.85);
  bullets.setAll('scale.x', 1);
  bullets.setAll('scale.y', 1);
});
}

function attack() {
  if(game.time.now < rob.nextAtk) {
    console.log('too soon');
    return false;
  } else {
    rob.nextAtk = game.time.now + ((10 - rob.currentWeapon.atkRate) * 100);
  }
  if (rob.currentWeapon.type === 'melee' && (!meleeRightTween.isRunning || !meleeLeftTween.isRunning)) {
    console.log('melee-ing');
    if (inputLeft()) {
      meleeLeftTween = game.add.tween(rob.arm).to({angle: '-100'}, 160, 'Quint.easeOut');
      meleeLeftTween.start();
    } else {
      meleeRightTween = game.add.tween(rob.arm).to({angle: '100'}, 160, 'Quint.easeOut');
      meleeRightTween.start();
    }
    meleeEnemy();
    meleeRightTween.onComplete.add(function() {
      game.add.tween(rob.arm).to({angle: (angleToPointer(rob.arm) + rob.currentWeapon.angleAdjust)}, 50, 'Quint.easeOut', true);
    });
  } else if (!gunTween.isRunning) {
    console.log('gun-ing');
    gunTween = game.add.tween(rob.arm.anchor).from({x: 0.2}, 100, 'Linear');
    gunTween.start();
    fire();
  }
}

function fire() {
  console.log('firing!');
  bullet = bullets.getFirstDead();
//  bullet.reset(rob.arm.x, rob.arm.y);
  bullet.reset(rob.arm.x, rob.arm.y);
  if (inputLeft()) {
    bullet.anchor.y = 0.15;
  } else {
    bullet.anchor.y = 0.85;
  }
  game.physics.arcade.moveToPointer(bullet, 7000);
  bullet.rotation = game.physics.arcade.angleToPointer(bullet);   
}

function radians(degrees) {
  return degrees / (180 / Math.PI);
}
function degrees(radians) {
  return radians * (180 / Math.PI)
}
function norm(target, scale, anchorX, anchorY) {
  var target = target;
  scale = scale !== undefined ? scale : 1;
  anchorX = anchorX !== undefined ? anchorX : 0.5;
  anchorY = anchorY !== undefined ? anchorY : 0.5;
  target.scale.setTo(scale);
  target.anchor.setTo(anchorX, anchorY);
}

function angleToPointer() {
  return degrees(game.physics.arcade.angleToPointer(rob.arm));  
}

function inputLeft() {
  return game.input.x + game.camera.x < rob.arm.x;
}


