/**
 * Created by JuanM on 06/12/2016.
 */
function Hero(image,animation){
    Kinetic.Sprite.call(this);
    this.setWidth(40);
    this.setHeight(70);
    this.attrs.image = image;
    this.setAnimations(animation);
    this.setAnimation('walkHero');
    this.thisJump = false;
    this.direction = true;
    this.vx = 15;
    this.vxback = -15;
    this.vy = 0;
    this.limiteDer = 0;
    this.limiteTBottom = 0;
    this.direction = 1;
    this.contador = 0;
    this.attrs.frameRate = 10;
    this.walk = function(){
        if (this.direction)
        {this.move(this.vx,0);}
        else
        {
            this.attrs.drawFunc = function (a){
                var b=this.attrs.animation,c=this.attrs.index,d=this.attrs.animations[b][c],e=a.getContext(),f=this.attrs.image;f&&e.drawImage(f,d.x,d.y,d.width,d.height,0,0,d.width,d.height)
            }
            this.setScale({x:1});
            this.direction = true;
        }
        if (this.getX() > this.limiteDer)
        this.move(this.limiteDer - this.getX(),0);
    }
    this.back = function(){
        if(!this.direction)
        { this.move(this.vxback,0);}
        else {
            this.attrs.drawFunc = function (a){
                var b=this.attrs.animation,c=this.attrs.index,d=this.attrs.animations[b][c],e=a.getContext(),f=this.attrs.image;f&&e.drawImage(f,d.x,d.y,d.width,d.height, -d.width,0,d.width,d.height)
            }
            this.setScale({x:-1});
            this.direction = false;
        }
        if (this.getX() < 0)
        this.move(-this.getX(),0);
    }
    this.jump = function(){
        this.thisJump = true;
        if(this.vy <= 2){
            this.setAnimation('jumpHero');
            this.vy= -20;
            this.contador++;
            this.afterFrame(10, function () {
                this.thisJump = false;
                this.setAnimation('staticHero');
            });
        }
    };
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
