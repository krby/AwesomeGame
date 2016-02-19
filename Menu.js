boil.Menu = function(){};

boil.Menu.prototype = {
    preload: function(){

    },
    create: function(){
        console.log('You are in the Menu state');
        game.stage.backgroundColor = '#FF0000';
        game.input.onDown.add(function(){
            changeState('Play');
        }); 
    },
    update: function(){
        
    }
};