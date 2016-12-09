/**
 * Created by JuanM on 06/12/2016.
 */
var framesHero = {
    static: [{x:30, y:0, width: 65, height:79 }],
    walk: [
        {x:30,  y:0, width: 65, height:79 },
        {x:109, y:0, width: 65, height:79 },
        {x:188, y:0, width: 65, height:79 },
        {x:267, y:0, width: 65, height:79 },
        {x:346, y:0, width: 65, height:79 },
        {x:425, y:0, width: 65, height:79 }
    ],
    jumFrame: [
        {x:109, y:70, width: 65, height:79},
        {x:188, y:70, width: 65, height:79},
        {x:267, y:70, width: 65, height:79},
        {x:346, y:70, width: 65, height:79},
        {x:425, y:70, width: 65, height:79}
    ]
};
var stage,backgroundGame,groupEnemy,scoreText;
var keyboard = {};
var interval;
var hero;
var gravity = 0.8;
var revolver = 0;
var game = new Game();
//img object
var heroImg = new Image();
heroImg.src = "images/hero.png";
var enemyImg = new Image();
enemyImg.src = "images/enemy.png";
var coinImg = new Image();
coinImg.src = "images/coin.png";
var keyImg = new Image();
keyImg.src = "images/key.png";
var doorImg = new Image();
doorImg.src = "images/door.png";
var platformImg = new Image();
platformImg.src = "images/platform.png";

//group Enemy
groupEnemy = new Kinetic.Group({
    x:0,
    y:0
});

//container of game
stage = new Kinetic.Stage({
   container: 'game',
    width: 960,
    height: 500
});

//score text
scoreText = new Kinetic.Text({
    text: 'Score: 0',
    height: 25,
    width: 150,
    x:stage.getWidth()-150,
    y:0,
    fill: '#222',
    fontFamily: 'Arial',
    fontSize: 20
});

//levelOne
function levelOne(){
    game.puntaje = 0;
    game.key= true;
    backgroundGame = new Kinetic.Layer();
    //enemy
    groupEnemy.add(new Enemy(200,stage.getHeight()-75,enemyImg));
    groupEnemy.add(new Enemy(850,stage.getHeight()/3.9-60,enemyImg));
    groupEnemy.add(new Enemy(170,stage.getHeight()/3-60,enemyImg));
    groupEnemy.add(new Enemy(1020,stage.getHeight()-75,enemyImg));
    groupEnemy.add(new Enemy(1120,stage.getHeight()-75,enemyImg));
    groupEnemy.add(new Enemy(1220,stage.getHeight()-75,enemyImg));

    //platforms
    var floor = new Platform(0,stage.getHeight()-15,platformImg);
    floor.setWidth(stage.getWidth()*2);
    groupEnemy.add(floor);
    groupEnemy.add(new Platform(20,stage.getHeight()/1.5,platformImg));
    groupEnemy.add(new Platform(190,stage.getHeight()/3,platformImg));
    groupEnemy.add(new Platform(510,stage.getHeight()/1.6,platformImg));
    groupEnemy.add(new Platform(870,stage.getHeight()/3.9,platformImg));

    //coin
    groupEnemy.add(new Coin(350,stage.getHeight()/3-130,coinImg));
    groupEnemy.add(new Coin(650,stage.getHeight()/2-130,coinImg));
    groupEnemy.add(new Coin(80,stage.getHeight()-80,coinImg));
    groupEnemy.add(new Coin(350,stage.getHeight()/3-130,coinImg));
    groupEnemy.add(new Coin(910,stage.getHeight()/6,coinImg));
    groupEnemy.add(new Coin(1220,stage.getHeight()-80,coinImg));

    //door
    groupEnemy.add(new Door(910,stage.getHeight()-85,doorImg));

    //hero
    hero = new Hero(heroImg,framesHero);
    hero.setX(0);
    hero.setY(stage.getHeight()-hero.getHeight());
    hero.limiteDer = stage.getWidth() - hero.getWidth();
    hero.limiteTBottom = stage.getHeight();
    //add
    backgroundGame.add(groupEnemy);
    backgroundGame.add(hero);
    backgroundGame.add(scoreText);
    hero.start();
    stage.add(backgroundGame);

    interval = setInterval(frameLoop,1000/20);
}

//levelTwo
function levelTwo(){
    console.log('Bienvenido al nivel 2');
}

//move hero
function moveHero(){
    //left keyboard back
    if(keyboard[37]){
        hero.back();
    }
    //right keyboard walk
    if(keyboard[39]){
        hero.walk();
    }
    //up keyboard jump
    if(keyboard[38] && hero.contador < 1){
        hero.jump();
    }
}

//event keyboard
function addKeyboardEvents(){
    addEvent(document,"keydown",function(e){
        keyboard[e.keyCode] = true;
    });
    addEvent(document,"keyup",function(e){
        keyboard[e.keyCode] = false;
    });
    function addEvent(element,eventName,func){
        // browser all
        if(element.addEventListener){
            element.addEventListener(eventName,func,false);
        }
        else{
            // browser explorer
            if(element.attachEvent){
                element.attachEvent(eventName,func);
            }
        }
    }

}

//algorithm game
function hit(a,b){
    var  hit = false;
    //collision horizontal
    if(b.getX() + b.getWidth() >= a.getX() && b.getX() < a.getX() + a.getWidth())
    {
        //collision vertical
        if (b.getY() + b.getHeight() >= a.getY() && b.getY() < a.getY() + a.getHeight())
            hit = true;
    }
    //collision of a with b
    if(b.getX() <= a.getX() && b.getX() + b.getWidth() >= a.getX() + a.getWidth())
    {
        if (b.getY() <= a.getY() && b.getY() + b.getHeight() >= a.getY() + a.getHeight())
                hit = true;
    }
    //collision of b with a
    if(b.getX() <= b.getX() && a.getX() + a.getWidth() >= b.getX() + b.getWidth())
    {
        if (a.getY() <= b.getY() && a.getY() + a.getHeight() >= b.getY() + b.getHeight())
            hit = true;
    }
    return hit;
}

function moveEnemy(){
    var enemies = groupEnemy.children;
    for(i in enemies){
        var enemy = enemies[i];
        if(enemy instanceof Enemy)
            enemy.mover();
    }
}

function applyForce(){
    hero.applyGravity(gravity,revolver)
}

//collision platform
function collisionPlatform(){
    var platforms = groupEnemy.children;
    for(i in platforms){
        var platform = platforms[i];
        //collision hero -> enemy
        if(hit(platform,hero))
        {
            if(platform instanceof Enemy){
                //delete enemy
                if(hero.vy > 2 && hero.getY() < platform.getY()){
                    platform.remove();
                    game.score += 5; //sum score
                    console.log(game.score);
                }else{
                    //delete hero
                    console.log('Fin del Juego');
                }
            }
            //collision hero -> platform
             else   if(platform instanceof Platform && hero.getY() < platform.getY() && hero.vy >=0){
                    hero.contador = 0;
                    hero.setY(platform.getY() - hero.getHeight());
                    hero.vy *= revolver; //stop hero in platform
                }
                    //collision hero -> coin
                    else   if(platform instanceof Coin){
                        platform.remove();
                        game.score += 10;
                    }
                        //collision hero -> door
                        else   if(platform instanceof Door && game.key){
                            if(game.level == 1) levelTwo();
                            if(game.level == 2) console.log('Ganaste');
                        }
        }
    }
}

//text in stage
function updateText(){
    scoreText.setText('Score: '+game.score);

}

//loop frameGame
addKeyboardEvents();
function frameLoop(){
    applyForce();
    collisionPlatform();
    moveHero();
    moveEnemy();
    updateText();
    stage.draw();
}