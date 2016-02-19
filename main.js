var game = new Phaser.Game(1500, 1000, Phaser.AUTO);
game.state.add('Load', boil.Load);
game.state.add('Menu', boil.Menu);
game.state.add('Play', boil.Play);
game.state.add('GameOver', boil.GameOver);
game.state.start('Load'); 
