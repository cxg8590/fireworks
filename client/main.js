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

var intervalID;682

let userID;

//handler for mouse clicks
const clickHandler = (e) => {
    if(currentRocket != null && e.x >= 682 && e.x <= 1181 && e.y >= 100 && e.y <= 600){
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
    if(currentRocket != null && e.x >= 682 && e.x <= 1181 && e.y >= 100 && e.y <= 600){
        moveCurrent(e);
    }
};

const init = () => {
  
  canvas = document.querySelector('#canvas');
  ctx = canvas.getContext('2d');
  canvas2 = document.querySelector('#canvasMin');
  ctx2 = canvas2.getContext('2d');

  socket = io.connect();
    
    socket.on("connectID", (data) => {
        if(userID == null){
            userID = data;
        }
    });
    
    socket.on("getID", (data) => {
        console.log("yourID: " + userID);
        console.log("Rocket userID: " + data.user);
        if(data.user != userID){
            console.log("not yours");
            launchingRockets.push(data);
        }
        else{console.log("Yours");}
        launchingRockets[launchingRockets.length -1].id = data.id;
    });
  
    socket.on('soaring', (data) => {
        //console.log("soaring" + data);
        if(data != null || ""){
            
        //flyingRockets = data;
        for(var i = 0; i < data.length; i++){
            //console.log("data id" + data[i].id);
            for(var j = 0; j < launchingRockets.length; j++){              
            //console.log("launchingRockets id" + launchingRockets[j].id);
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