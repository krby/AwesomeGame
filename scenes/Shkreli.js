AG.Shkreli = function(){};
    
var centerX = 925, centerY = 500, meleeLeftTween, meleeRightTween, gunTween;

AG.SAVE = {
  state: 'Shkreli',
  weapons: [
    {
      type: 'melee',
      names: 'Axe',
      key: 'axe',
      damage: 10,
      angleAdjust: -radians(30),
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
      type: 'gun',
      name: 'Pistol',
      key: 'pistol',
      bullet: 'bullet',
      damage: 10,
      angleAdjust: 0,
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
      damage: 10,
      angleAdjust: 0,
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
      damage: 10,
      angleAdjust: 0,
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
  currentWeapon: AG.SAVE.weapons[0]
}

AG.Shkreli.prototype = {
  create: function(){
    
    console.log('You are in the Shkreli state');
    game.stage.backgroundColor = '#fff';
    
    rob.body = game.add.sprite(centerX, centerY, 'robBody');
    norm(rob.body, 0.4, 0.5, 0.3);
    rob.arm = game.add.sprite(rob.body.x, rob.body.y - 40, rob.currentWeapon.key);
    norm(rob.arm, 0.4, rob.currentWeapon.anchor.x, rob.currentWeapon.anchor.y);
    
    game.physics.enable([rob.arm, rob.body]);
    
    rob.body.body.gravity.y = 1000;
    rob.body.body.collideWorldBounds = true;
    game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(moveHorizontally, null, null, -1);
    game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(moveHorizontally, null, null, 1);
    game.input.keyboard.addKey(Phaser.Keyboard.Q).onDown.add(toggleWeapons, null, null, -1);
    game.input.keyboard.addKey(Phaser.Keyboard.E).onDown.add(toggleWeapons, null, null, 1);
    game.input.onDown.add(attack);
    
    meleeRightTween = meleeLeftTween = gunTween = game.add.tween();
  },
  update: function(){
    rob.arm.x = rob.body.x;
    rob.arm.y = rob.body.y;
    if (!game.input.keyboard.isDown(Phaser.Keyboard.A) && 
        !game.input.keyboard.isDown(Phaser.Keyboard.D)) {
      rob.body.body.velocity.x = 0;
    }
    if (game.input.x < rob.body.x) {
      rob.currentWeapon.angleAdjust = rob.currentWeapon.angleAdjusts.left;
      rob.body.scale.x = -0.4
      rob.arm.scale.x = -0.4
    } else {
      rob.currentWeapon.angleAdjust = rob.currentWeapon.angleAdjusts.right;
      rob.body.scale.x = 0.4
      rob.arm.scale.x = 0.4
    }
//    rob.arm.rotation = game.physics.arcade.angleToPointer(rob.arm) + rob.currentWeapon.angleAdjust;
    rob.arm.angle = angleToPointer(rob.arm) + rob.currentWeapon.angleAdjust;
  }
};


function moveHorizontally(e, direction) {
  rob.body.body.velocity.x = rob.speed * direction;
}
function toggleWeapons(e, direction) {
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
  norm(rob.arm, 0.4, rob.currentWeapon.anchor.x, rob.currentWeapon.anchor.y);
}

function attack() {
  if (rob.currentWeapon.type === 'melee' && (!meleeRightTween.isRunning || !meleeLeftTween.isRunning)) {
    console.log('melee-ing');
    if (game.input.x < rob.body.x) {
      meleeLeftTween = game.add.tween(rob.arm).to({angle: 0}, 160, 'Quint.easeOut');
      meleeLeftTween.start();
    } else {
      meleeRightTween = game.add.tween(rob.arm).to({angle: 0}, 160, 'Quint.easeOut');
      meleeRightTween.start();
    }
  } else if (!gunTween.isRunning) {
    console.log('gun-ing');
    gunTween = game.add.tween(rob.arm.anchor).from({x: 0.2}, 100, 'Linear');
    gunTween.start();
  }
}

function fire() {
  if(game.time.now > nextFire) {
    nextFire = game.time.now + fireRate;
    console.log('firing');
    bullet = bullets.getFirstDead();
    bullet.reset(barrel.x, barrel.y);

    game.physics.arcade.moveToPointer(bullet, velocity);
    bullet.rotation = game.physics.arcade.angleToPointer(bullet);   
  }
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