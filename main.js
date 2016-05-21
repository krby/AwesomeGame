var game = new Phaser.Game(1500, 1000, Phaser.AUTO);
game.state.add('Load', AG.Load);
game.state.add('Menu', AG.Menu);
game.state.add('Map', AG.Map);
game.state.add('WoodCut', AG.WoodCut);
game.state.add('Cutscene', AG.Cutscene);
game.state.add('Map', AG.Map);
game.state.start('Load'); 
