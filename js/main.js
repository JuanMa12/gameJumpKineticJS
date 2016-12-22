/**
 * Created by JuanM on 06/12/2016.
 */
var framesHero = {
    staticHero: [{x:30, y:0, width: 65, height:79 }],
    walkHero: [
        {x:30,  y:0, width: 65, height:79 },
        {x:109, y:0, width: 65, height:79 },
        {x:188, y:0, width: 65, height:79 },
        {x:267, y:0, width: 65, height:79 },
        {x:346, y:0, width: 65, height:79 },
        {x:425, y:0, width: 65, height:79 }
    ],
    jumpHero: [
        {x:109, y:70, width: 65, height:79},
        {x:188, y:70, width: 65, height:79},
        {x:188, y:70, width: 65, height:79},
        {x:267, y:70, width: 65, height:79},
        {x:267, y:70, width: 65, height:79},
        {x:346, y:70, width: 65, height:79},
        {x:346, y:70, width: 65, height:79},
        {x:425, y:70, width: 65, height:79},
        {x:425, y:70, width: 65, height:79},
        {x:425, y:70, width: 65, height:79},
        {x:425, y:70, width: 65, height:79}
    ]
};
var stage,backgroundGame,groupObject,scoreText;
var keyboard = {};
var interval;
var hero;
var gravity = 0.8;
var revolver = 0;
var b = false;
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
var backgroundImg = new Image();
backgroundImg.src = "images/backgroundGame.jpg";

//group Enemy
groupObject = new Kinetic.Group({
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
    y:15,
    fill: '#FFF',
    fontFamily: 'Arial',
    fontSize: 20
});

//image background game
backgroundImg = new Kinetic.Image({
    x:0, y:0,image: backgroundImg,
    width: stage.getWidth(),
    height: stage.getWidth()
});

//levelOne
function levelOne(){
    game.score = 0;
    if(b)return;
    b = true;
    game.key= true;
    backgroundGame = new Kinetic.Layer();
    //enemy
    groupObject.add(new Enemy(200,stage.getHeight()-75,enemyImg));
    groupObject.add(new Enemy(850,stage.getHeight()/3.9-60,enemyImg));
    groupObject.add(new Enemy(170,stage.getHeight()/3-60,enemyImg));
    groupObject.add(new Enemy(1020,stage.getHeight()-75,enemyImg));
    groupObject.add(new Enemy(1120,stage.getHeight()-75,enemyImg));
    groupObject.add(new Enemy(1220,stage.getHeight()-75,enemyImg));

    //platforms
    var floor = new Platform(0,stage.getHeight()-15,platformImg);
    floor.setWidth(stage.getWidth()*2);
    groupObject.add(floor);
    groupObject.add(new Platform(20,stage.getHeight()/1.5,platformImg));
    groupObject.add(new Platform(190,stage.getHeight()/3,platformImg));
    groupObject.add(new Platform(510,stage.getHeight()/1.6,platformImg));
    groupObject.add(new Platform(870,stage.getHeight()/3.9,platformImg));

    //coin
    groupObject.add(new Coin(350,stage.getHeight()/3-130,coinImg));
    groupObject.add(new Coin(650,stage.getHeight()/2-130,coinImg));
    groupObject.add(new Coin(80,stage.getHeight()-80,coinImg));
    groupObject.add(new Coin(350,stage.getHeight()/3-130,coinImg));
    groupObject.add(new Coin(910,stage.getHeight()/6,coinImg));
    groupObject.add(new Coin(1220,stage.getHeight()-80,coinImg));

    //key
    groupObject.add(new Key(780, stage.getHeight()/3.9-60, keyImg));

    //door
    groupObject.add(new Door(910,stage.getHeight()-85,doorImg));

    //hero
    hero = new Hero(heroImg,framesHero);
    hero.setX(0);
    hero.setY(stage.getHeight()-hero.getHeight());
    hero.limiteDer = stage.getWidth() - hero.getWidth();
    hero.limiteTBottom = stage.getHeight();

    //add and stage
    backgroundGame.add(backgroundImg);
    backgroundGame.add(groupObject);
    backgroundGame.add(hero);
    backgroundGame.add(scoreText);
    hero.start();
    stage.add(backgroundGame);

    interval = setInterval(frameLoop,1000/20);
}

//levelTwo
function levelTwo() {
    backgroundGame = new Kinetic.Layer();
    game.key = false;

    //enemy
    groupObject.add(new Enemy(200, stage.getHeight() / 1.5-60, enemyImg));
    groupObject.add(new Enemy(25, stage.getHeight() / 3 - 60, enemyImg));
    groupObject.add(new Enemy(500,stage.getHeight()-75,enemyImg));
    groupObject.add(new Enemy(580,stage.getHeight()-75,enemyImg));

    //platforms
    var floor = new Platform(0, stage.getHeight() - 15, platformImg);
    floor.setWidth(stage.getWidth() * 2);
    groupObject.add(floor);
    groupObject.add(new Platform(190, stage.getHeight() / 1.5, platformImg));
    groupObject.add(new Platform(10, stage.getHeight() / 3, platformImg));
    groupObject.add(new Platform(310, stage.getHeight() / 4, platformImg));
    groupObject.add(new Platform(700, stage.getHeight() / 3.9, platformImg));

    //coin
    groupObject.add(new Coin(350, stage.getHeight() / 3 - 130, coinImg));

    //door
    groupObject.add(new Door(1000, stage.getHeight() - 90, doorImg));

    //key
    groupObject.add(new Key(780, stage.getHeight()/3.9-60, keyImg));

    //hero
    hero = new Hero(heroImg, framesHero);
    hero.setX(0);
    hero.setY(stage.getHeight() - hero.getHeight());
    hero.limiteDer = stage.getWidth() - hero.getWidth();
    hero.limiteTBottom = stage.getHeight();

    //add and stage
    backgroundGame.add(backgroundImg);
    backgroundGame.add(groupObject);
    backgroundGame.add(hero);
    backgroundGame.add(scoreText);
    hero.start();
    stage.add(backgroundGame);

    interval = setInterval(frameLoop, 1000 / 20);
}

//move hero
function moveHero(){
    if( hero.setAnimation() != 'walkHero' &&(keyboard[37] || keyboard[39])){
        hero.setAnimation('walkHero');
    }
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
    //static hero jump
    if(!(keyboard[39] || keyboard[38] || keyboard[37]) && !hero.thisJump){
        hero.setAnimation('staticHero');
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

function moveBackground(){
    if(hero.getX() < (stage.getWidth()/2) && keyboard[39]){
        hero.vx = 2;
        for(i in groupObject.children){
            var groupMove = groupObject.children[i];
            groupMove.move(-5,0);
        }
    }else{
        hero.vx = 10;
    }
}

function moveEnemy(){
    var enemies = groupObject.children;
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
    var platforms = groupObject.children;
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
                    //End Game
                    groupObject.removeChildren();
                    document.querySelector('#lose').style.display = 'block';
                    document.querySelector('#game').style.display = 'none';
                    window.clearInterval(interval);
                    b = false;
                }
            }
            //collision hero -> platform
             else{
                if(platform instanceof Platform && hero.getY() < platform.getY() && hero.vy >=0){
                    hero.contador = 0;
                    hero.setY(platform.getY() - hero.getHeight());
                    hero.vy *= revolver; //stop hero in platform
                }
            //collision hero -> coin
            else   if(platform instanceof Coin){
                platform.remove();
                game.score += 10;
            }
            //collision hero -> key
            else {
                    if(platform instanceof Key){
                        platform.remove();
                        game.key = true;
                        continue;
                    }
                    //collision hero -> door
                    else {
                        if(platform instanceof Door && game.key){
                           //LEVEL ONE
                           if(game.level == 1) {
                              groupObject.removeChildren();
                              window.clearInterval(interval);
                              game.level = 2;
                              levelTwo();
                             }
                             else {
                                   if (game.level == 2)
                                     //LEVEL TWO
                                     groupObject.removeChildren();
                                     document.querySelector('#win').style.display = 'block';
                                     document.querySelector('#game').style.display = 'none';
                                     document.querySelector('#score').innerHTML = game.score;
                                     window.clearInterval(interval);
                                     b = false;
                             }
                            }
                        }
                    }
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
    moveBackground();
    updateText();
    stage.draw();
}