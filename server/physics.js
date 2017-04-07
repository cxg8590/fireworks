// our socket code for physics to send updates back
const sockets = require('./sockets.js');

let charList = {}; // list of characters
let rockets = []; // array of attack to handle
const grav = 10;

const gravity = () => {
    if(rockets.length > 0){
    for(var i = 0; i < rockets.length; i++){
        console.log("bad idea1 Y: " + rockets[i].y);
        rockets[i].y -= rockets[i].vel;
        rockets[i].velY -= grav;
        console.log("bad idea2 y: " + rockets[i].ht);
        if(rockets[i].ht >= rockets[i].y){
            rockets[i].vel *= -1;
        }
        rockets[i].x += rockets[i].ang * .1;
        if(rockets[i].x >= 500 || rockets[i].x <= 0){
            rockets[i].ang *= -1;
        }
        
    }
    sockets.handleFlight(rockets);
    }
};

// add a new attack to calculate physics on
const addRocket = (rocket) => {
  rockets.push(rocket);
};

// check for collisions every 20ms
setInterval(() => {
  gravity();
}, 20);
module.exports.addRocket = addRocket;
/*module.exports.setCharacterList = setCharacterList;
module.exports.setCharacter = setCharacter;
module.exports.addAttack = addAttack;
*/