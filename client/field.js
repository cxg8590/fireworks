//moves dummy rocket with the cursor
const moveCurrent = (e) => {
    //console.log("mouse x: "+e.x);
    currentRocket.x = e.x - 682;
    //mainUpdate();
};


//sends rocket to server
const launching = (e) => {
    //console.log("launching out: "+e.out);
    
    launchingRockets.push(e);
    console.log("launching out: "+userID);
    var tempPackage = {
            outR: e.outR,
            outG: e.outG,
            outB: e.outB,
            inR: e.inR,
            inG: e.inG,
            inB: e.inB,
            x: e.x,
            y: e.y,
            ht: e.ht,
            ang :e.ang,
            fus: e.fs,
            up: e.up,
            ex: e.ex,
            velY: e.velY,
            user: userID
        };
        socket.emit("launch",tempPackage);
};

//main update loop
const mainUpdate = () => {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var image = new Image(500,500);
    image.src = "https://people.rit.edu/cxg8590/realTime/fireworks/nightSky.png";
    ctx.drawImage(image, 0, 0, 500, 500);
    //console.log(currentRocket.x);
    
    //current
    if(currentRocket != null){
    //outter
    ctx.fillStyle = "#" + currentRocket.out;
    ctx.beginPath();
    ctx.arc(currentRocket.x,490,10,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();
    
    //inner
    ctx.fillStyle = "#" + currentRocket.in;
    ctx.beginPath();
    ctx.arc(currentRocket.x,490,5,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();
    }
    
    //motion
    for(var i = 0; i < launchingRockets.length; i++){
        //console.log("inner color: "+launchingRockets[i].y);
        launchingRockets[i].out = rgb2hex(launchingRockets[i].outR, launchingRockets[i].outG,launchingRockets[i].outB);
        launchingRockets[i].in = rgb2hex(launchingRockets[i].inR, launchingRockets[i].inG,launchingRockets[i].inB);
<<<<<<< HEAD
=======
        
>>>>>>> 5036b0788e0b7db621f4d9e7119fe7f48de3c300
        if(launchingRockets[i].exing == false){
        //outter
        ctx.fillStyle = launchingRockets[i].out;
        ctx.beginPath();
        ctx.arc(launchingRockets[i].x,launchingRockets[i].y,4,0,2*Math.PI);
        ctx.stroke();
        ctx.fill();
        //inner
        ctx.fillStyle = launchingRockets[i].in;
        ctx.beginPath();
        ctx.arc(launchingRockets[i].x,launchingRockets[i].y,2,0,2*Math.PI);
        ctx.stroke();
        ctx.fill();
        
        //particles
        spark(launchingRockets[i], launchingRockets[i].in);
        }
        
        //explosion particles
        if(launchingRockets[i].exing){
            //particles
            spark(launchingRockets[i], launchingRockets[i].out);
        }
        
        //explode
        if(launchingRockets[i].ex){
            launchingRockets[i].ex = false;
            launchingRockets[i].exing = true;
            console.log("Boom");
            explode(launchingRockets[i].id);
            outspark(launchingRockets[i]);
            //setTimeout(function(){launchingRockets.splice(i,1)}, 1000);
        }
    }
    //handles particles
    particles.forEach(function(e){
            sparkUpdate(e);
        });
    outsparkUpdate();
};

<<<<<<< HEAD
//changes rgb to hex
=======
>>>>>>> 5036b0788e0b7db621f4d9e7119fe7f48de3c300
function rgb2hex(red, green, blue) {
        var rgb = blue | (green << 8) | (red << 16);
        return '#' + (0x1000000 + rgb).toString(16).slice(1);
  }
