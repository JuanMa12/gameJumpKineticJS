/**
 * Created by JuanM on 19/12/2016.
 */
function Key(x,y,image){
    Kinetic.Image.call(this);
    this.setWidth(30);
    this.setHeight(40);
    this.setX(x);
    this.setY(y);
    this.setImage(image);
}
Key.prototype = Object.create(Kinetic.Image.prototype);