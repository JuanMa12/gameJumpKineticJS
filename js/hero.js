/**
 * Created by JuanM on 06/12/2016.
 */
function Hero(image,animation){
    Kinetic.Sprite.call(this);
    this.setWidth(40);
    this.setHeight(70);
    this.attrs.image = image;
    this.setAnimations(animation);
    this.setAnimation('walk');
    this.vx = 15;
    this.vxback = -15;
    this.vy = 0;
    this.limiteDer = 0;
    this.limiteTBottom = 0;
    this.direccion = 1;
    this.contador = 0;
    this.attrs.frameRate = 10;
    this.walk = function(){
        this.move(this.vx,0);
        if (this.getX() > this.limiteDer)
        this.move(this.limiteDer - this.getX(),0)
    }
    this.back = function(){
        this.move(this.vxback,0);
        if (this.getX() < 0)
        this.move(-this.getX(),0)
    }
    this.jump = function(){
        this.vy= -20;
        this.contador++;
    }
    this.applyGravity = function(gravity,revolver){
        this.vy += gravity;
        this.move(0,this.vy);
        if((this.getY() + this.getHeight()) > this.limiteTBottom){
            this.setY(this.limiteTBottom - this.getHeight());
            this.vy = 0;
            this.contador = 0;
        }
    }

}
Hero.prototype = Object.create(Kinetic.Sprite.prototype);
