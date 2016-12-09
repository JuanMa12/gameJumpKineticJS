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
    'images/coin.png'
];
window.addEventListener('load',function(){
    recharge = new PreloadJS();
    recharge.onProgress = progressLoad;
    load();
});
function load(){
    while(images.length > 0){
        var url = images.shift();
        recharge.loadFile(url);
    }
}
function progressLoad(){
    if(recharge.progress = 1){
        levelOne();
    }
}
