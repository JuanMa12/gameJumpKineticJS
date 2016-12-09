/**
 * Created by JuanM on 09/12/2016.
 */
function Door(x,y,image) {
    Kinetic.Image.call(this);
    this.setWidth(40);
    this.setHeight(70);
    this.setX(x);
    this.setY(y);
    this.setImage(image);
}
Door.prototype = Object.create(Kinetic.Image.prototype);