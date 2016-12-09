/**
 * Created by JuanM on 06/12/2016.
 */
function Platform(x,y,image){
    Kinetic.Rect.call(this);
    this.setWidth(200);
    this.setHeight(40);
    this.setX(x);
    this.setY(y);
    this.setFillPatternImage(image);
}
Platform.prototype = Object.create(Kinetic.Rect.prototype);
