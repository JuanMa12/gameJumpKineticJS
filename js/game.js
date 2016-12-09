/**
 * Created by JuanM on 06/12/2016.
 */
function Game(x,y){
    Kinetic.Rect.call(this);
    this.status = 'back';
    this.score = 0;
    this.key = false;
    this.level = 1;


}
Game.prototype = Object.create(Kinetic.Rect.prototype);
