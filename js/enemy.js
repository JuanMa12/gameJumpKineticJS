/**
 * Created by JuanM on 06/12/2016.
 */
function Enemy(x,y,image){
    Kinetic.Image.call(this);
    this.setWidth(60);
    this.setHeight(60);
    this.setX(x);
    this.setY(y);
    this.contador = 0;
    this.setImage(image);
    this.aleatorio = function(inferior,superior){
        var posibilidades = superior - inferior;
        var random = Math.random() * posibilidades;
        random = Math.floor(random);
        return parseInt(inferior) + random;
    }
    this.mover = function(){
        this.contador++;
        this.setX(this.getX()+ Math.sin(this.contador * Math.PI /50)*5);
    }
}
Enemy.prototype = Object.create(Kinetic.Image.prototype);
