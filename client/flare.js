var MAX_PARTICLES = 100;

var particles = [];
var pool = [];
var outSparks = [];

function Particle( x, y, radius ) {
            this.init( x, y, radius );
        }

//Oarticle prototype, taken from sketch.js particle demo http://soulwire.github.io/sketch.js/examples/particles.html
Particle.prototype = {
    init: function( x, y, radius ) {
        this.alive = true;
        this.radius = radius || 10;
        this.wander = 0.15;
        this.theta = Math.random( Math.PI * 2 );
        this.drag = 0.92;
        this.color = '#19B217';
        this.x = x || 0.0;
        this.y = y || 0.0;
        this.vx = 0.0;
        this.vy = 0.0;
    },
    move: function() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= this.drag;
        this.vy *= this.drag;
        this.theta += Math.random( -0.5, 0.5 ) * this.wander;
        this.vx += Math.sin( this.theta ) * 0.1;
        this.vy += Math.cos( this.theta ) * 0.1;
        this.radius *= 0.96;
        this.alive = this.radius > 0.5;
    },
    draw: function() {
        ctx.beginPath();
        ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2  );
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

//generates a particle
const spark = (roc, col) => {
    var particle, theta, force;
    if ( particles.length >= MAX_PARTICLES )
        pool.push( particles.shift() );
    particle = pool.length ? pool.pop() : new Particle();
    particle.init( roc.x, roc.y, Math.random( 5, 40 ) );
    particle.wander = Math.random( 0.5, 2.0 );
    particle.color = col;
    particle.drag = Math.random( 0.9, 0.99 );
    theta = Math.random( Math.PI * 2  );
    force = Math.random( 2, 8 );
    particle.vx = Math.sin( theta ) * force;
    particle.vy = Math.cos( theta ) * force;
    particles.push( particle );
};

const sparkUpdate = (e) => {
    e.move();
    e.draw();
};

const explode = (roc) => {
    setTimeout(function(){
        for(var i = 0; i < launchingRockets.length; i++){
            //console.log("explode confirmed");
            if(launchingRockets[i].id == roc){
                //console.log("explode confirmed2");
                launchingRockets.splice(i,1);
            }
        }
    },1000);
    //setTimeout(function(){launchingRockets.splice(roc,1)}, 1000);
    
    //spark(roc);
    //sparkUpdate(roc);
};

const outspark = (roc) => {
    for(var i = 0; i < 6; i++){
        var angle = 45 * i;
        var outSparkle = {centx:roc.x,centy:roc.y,x:0,y:0,dist:2,ang:angle,out:roc.out,in:roc.in, exing: true};
        
        outSparkle.x = roc.x + (2* Math.cos(angle));
        outSparkle.y = roc.y + (2* Math.sin(angle));
        
        outSparks.push(outSparkle);
        var length = outSparks.length;
    }
    setTimeout(function(){outSparks.splice(0,6)}, 3000);
};

const outsparkUpdate = () => {
    
    for(var i = 0; i < outSparks.length; i++){
        
        outSparks[i].dist++;// = outSparks[i].dist;
        outSparks[i].x = outSparks[i].centx + (outSparks[i].dist* Math.cos(outSparks[i].ang + outSparks[i].dist));
        outSparks[i].y = outSparks[i].centy + (outSparks[i].dist* Math.sin(outSparks[i].ang + outSparks[i].dist));
        
        /*ctx.beginPath();
        ctx.arc( outSparks[i].x, outSparks[i].y, 1, 0, Math.PI * 2  );
        ctx.fillStyle = "FF00FF";
        ctx.fill();*/
        spark(outSparks[i]);
    }
}

/*if(sketch != null){sketch.spawn = function( roc ) {
    
    var particle, theta, force;
    if ( particles.length >= MAX_PARTICLES )
        pool.push( particles.shift() );
    particle = pool.length ? pool.pop() : new Particle();
    particle.init( roc.x, roc.y, random( 5, 40 ) );
    particle.wander = random( 0.5, 2.0 );
    particle.color = roc.out;
    particle.drag = random( 0.9, 0.99 );
    theta = random( TWO_PI );
    force = random( 2, 8 );
    particle.vx = sin( theta ) * force;
    particle.vy = cos( theta ) * force;
    particles.push( particle );
};}*/ 
                  















