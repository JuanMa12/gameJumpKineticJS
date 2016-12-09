/**
 * Created by JuanM on 09/12/2016.
 */
function Coin(x,y,image) {
    Kinetic.Image.call(this);
    this.setWidth(30);
    this.setHeight(30);
    this.setX(x);
    this.setY(y);
    this.setImage(image);
}
Coin.prototype = Object.create(Kinetic.Image.prototype);
