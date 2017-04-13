let canvas;
let ctx;
let canvas2;
let ctx2;

//our websocket connection 
let socket; 
let hash; //user's unique character id (from the server)

let rockets = []; //character list
let launchingRockets = [];
let flyingRockets = [];
let currentRocket;

var intervalID;

//handler for mouse clicks
const clickHandler = (e) => {
    if(currentRocket != null && e.x <= 499 && e.y <= 500){
        //console.log("X: " + e.x + " Y: " + e.y);
        var tempRocket = Object.assign({}, currentRocket);
        rockets.push(tempRocket);
        //rockets[rockets.length - 1].x = +currentRocket.x;
        //console.log("time" + rockets[rockets.length - 1].in);
        
        setTimeout(launching(rockets[rockets.length - 1]), rockets[rockets.length - 1].time);
        //mainUpdate();
    }
};


//handler for mouse moves
const moveHandler = (e) => {
    if(currentRocket != null && e.x <= 550 && e.y <= 550){
        moveCurrent(e);
    }
};

const init = () => {
  
  canvas = document.querySelector('#canvas');
  ctx = canvas.getContext('2d');
  canvas2 = document.querySelector('#canvasMin');
  ctx2 = canvas2.getContext('2d');

  socket = io.connect();
    
    socket.on("getID", (data) => {
        launchingRockets[launchingRockets.length -1].id = data;
        
        var colorPack = {
            out: launchingRockets[launchingRockets.length -1].out,
            in: launchingRockets[launchingRockets.length -1].in,
            id: data
        };
        //socket.emit("colorPack",colorPack);
    });
  
    socket.on('soaring', (data) => {
        //console.log("soaring" + data);
        if(data != null || ""){
            
        //flyingRockets = data;
        for(var i = 0; i < data.length; i++){
            //console.log("data id" + data[i].id);
            for(var j = 0; j < launchingRockets.length; j++){              
            //console.log("launchingRockets id" + launchingRockets[i].id);
                if(data[i].id == launchingRockets[j].id){
                    launchingRockets[j].x = data[i].x;
                    launchingRockets[j].y = data[i].y;
                    launchingRockets[j].ex = data[i].ex;
                    /*launchingRockets[j].out = data[i].out;
                    launchingRockets[j].in = data[i].in;*/
                    //mainUpdate();
                    break;
                }
            }
        }
        }
        else{
            console.log("null update");
        }
    });
    if(typeof intervalID != "undefined") clearInterval(intervalID);
		intervalID = setInterval(mainUpdate, 30);
    minUpdate();
  
    document.body.addEventListener('mouseup', clickHandler);
  document.body.addEventListener('mousemove', moveHandler);
};

window.onload = init;