
const moveCurrent = (e) => {
    //console.log("mouse x: "+e.x);
    currentRocket.x = e.x;
    //mainUpdate();
};

const launching = (e) => {
    //console.log("launching out: "+e.out);
    
    launchingRockets.push(e);
    //console.log("launching out: "+e.ht);
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
            velY: e.velY
        };
        socket.emit("launch",tempPackage);
};

const mainUpdate = () => {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var image = new Image(500,500);
    image.src = "https://people.rit.edu/cxg8590/realTime/fireworks/nightBG.png";
    ctx.drawImage(image, 0, 0, 500, 500);
    //console.log(currentRocket.x);
    
    //current
    if(currentRocket != null){
    //outter
    ctx.fillStyle = "#" + currentRocket.out;
    ctx.beginPath();
    ctx.arc(currentRocket.x,450,20,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();
    
    //inner
    ctx.fillStyle = "#" + currentRocket.in;
    ctx.beginPath();
    ctx.arc(currentRocket.x,450,10,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();
    }
    
    //motion
    for(var i = 0; i < launchingRockets.length; i++){
        //console.log("inner color: "+launchingRockets[i].y);
        launchingRockets[i].out = "rgb(" + launchingRockets[i].outR + "," + launchingRockets[i].outG + "," +launchingRockets[i].outB + ")";
        launchingRockets[i].in = "rgb(" + launchingRockets[i].inR + "," + launchingRockets[i].inG + "," +launchingRockets[i].inB + ")";
        
        if(launchingRockets[i].exing == false){
        //outter
            console.log("out: " + launchingRockets[i].out);
        ctx.fillStyle = launchingRockets[i].out;
        console.log("style: " + ctx.fillStyle);
        console.log("in: " + launchingRockets[i].in);
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
        
        
        if(launchingRockets[i].exing){
            //particles
            spark(launchingRockets[i], launchingRockets[i].out);
        }
        
        //explode
        if(launchingRockets[i].ex){
            launchingRockets[i].ex = false;
            launchingRockets[i].exing = true;
            console.log("Boom");
            explode(i);
            outspark(launchingRockets[i]);
            setTimeout(function(){launchingRockets.splice(i,1)}, 1000);
        }
    }
    particles.forEach(function(e){
            sparkUpdate(e);
        });
    outsparkUpdate();
};

