
const moveCurrent = (e) => {
    //console.log("mouse x: "+e.x);
    currentRocket.x = e.x;
    mainUpdate();
};

const launching = (e) => {
    //console.log("launching out: "+e.out);
    
    launchingRockets.push(e);
    //console.log("launching out: "+e.ht);
    var tempPackage = {
            x: e.x,
            y: e.y,
            ht: e.ht,
            velY: e.velY
        };
        socket.emit("launch",tempPackage);
};

const mainUpdate = () => {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //current
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
    
    //rest
    for(var i = 0; i < rockets.length; i++){
       // console.log("inner color: "+rockets[rockets.length - 1].in);
        //outter
        ctx.fillStyle = "#" + rockets[i].out;
        ctx.beginPath();
        ctx.arc(rockets[i].x,450,20,0,2*Math.PI);
        ctx.stroke();
        ctx.fill();
        
        //inner
        ctx.fillStyle = "#" + rockets[i].in;
        ctx.beginPath();
        ctx.arc(rockets[i].x,450,10,0,2*Math.PI);
        ctx.stroke();
        ctx.fill();
    }
    
    //motion
    for(var i = 0; i < launchingRockets.length; i++){
        //console.log("inner color: "+launchingRockets[i].y);
        //outter
        ctx.fillStyle = "#" + launchingRockets[i].out;
        ctx.beginPath();
        ctx.arc(launchingRockets[i].x,launchingRockets[i].y,20,0,2*Math.PI);
        ctx.stroke();
        ctx.fill();
        
        //inner
        ctx.fillStyle = "#" + launchingRockets[i].in;
        ctx.beginPath();
        ctx.arc(launchingRockets[i].x,launchingRockets[i].y,10,0,2*Math.PI);
        ctx.stroke();
        ctx.fill();
    }
};
