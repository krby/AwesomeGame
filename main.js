var game = new Phaser.Game(1500, 1000, Phaser.AUTO);
game.state.add('Load', AA.Load);
game.state.add('Menu', AA.Menu);
game.state.add('Map', AA.Map);
game.state.add('WoodCut', AA.WoodCut);
game.state.add('Cutscene', AA.Cutscene);
game.state.add('Map', AA.Map);
game.state.start('Load'); 
