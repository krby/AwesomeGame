AG.Cutscene = function(){};

AG.Cutscene.prototype = {
    preload: function(){

    },
    create: function(){
        console.log('You are in the Cutscene state');
        game.stage.backgroundColor = '#FF0000';
   
    },
    update: function(){
        
    }
};