/**
 * Created by JuanM on 09/12/2016.
 */
var recharge;
var images = [
    'images/hero.png',
    'images/enemy.png',
    'images/key.png',
    'images/platform.png',
    'images/door.png',
    'images/coin.png',
    'images/backgroundGame.jpg'
];
window.addEventListener('load',function(){
    recharge = new PreloadJS();
    recharge.onProgress = progressLoad;
    load();
    var starts = document.getElementsByClassName('start');
    for(i in starts){
        var btn = starts[i];
        btn.addEventListener('click',startGame);
    }
});
function load(){
    while(images.length > 0){
        var url = images.shift();
        recharge.loadFile(url);
    }
}
function progressLoad(){
    if(recharge.progress = 1){
        document.querySelector('#info').style.display = 'block';
    }
}
//start game
function startGame(){
    document.querySelector('#info').style.display = 'none';
    document.querySelector('#lose').style.display = 'none';
    document.querySelector('#win').style.display = 'none';
    document.querySelector('#game').style.display = 'block';
    levelOne();

}
