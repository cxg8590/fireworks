// our socket code for physics to send updates back
const sockets = require('./sockets.js');

const rockets = []; // array of attack to handle
const grav = .1;

const gravity = () => {
  if (rockets.length > 0) {
    for (let i = 0; i < rockets.length; i++) {
      //console.log(`bad idea1 ht: ${rockets[i].ht}`);
      /*if(rockets[i].fus <= 0){
          var fuse = rockets[i].fus + 1;
          fuse = 500 - (fuse * (500 - rockets[i].ht));
          if(rockets[i].y <= fuse && rockets[i].up){
              rockets[i].ex = true;
          }
      }
        else{
            var fuse = (rockets[i].fus - 1)*-1;
            //console.log(`bad idea1 y: ${rockets[i].y}`);
      //console.log(`bad idea1 Fuse: ${fuse}`);
          fuse = 500 - (fuse * (500 - rockets[i].ht));
            
          if(rockets[i].y >= fuse && rockets[i].up == false){
              console.log(`explode`);
              rockets[i].ex = true;
          }
        }*/
        
        if(rockets[i].vel >= rockets[i].fus){
            
        }
        var fuse = rockets[i].fus;
        //if(fuse)
        //console.log("fuse: " + fuse);
        //console.log("vel: " + rockets[i].vel);
        if(rockets[i].vel >= fuse && rockets[i].up){
              rockets[i].ex = true;
        }
        else if(rockets[i].vel >= fuse && rockets[i].up == false){
              console.log(`explode`);
              rockets[i].ex = true;
        }
      
      //grav PHYSICS
      rockets[i].y += rockets[i].vel;
      rockets[i].vel += grav;
        //console.log("rocket y: " + rockets[i].y);
        //console.log("rocket velY: " + rockets[i].velY);
      if (rockets[i].vel >= 0) {
        //rockets[i].vel *= -1;
        rockets[i].up = false;
      }
      rockets[i].x += rockets[i].ang;
        //console.log("ang: " + rockets[i].ang);
      if (rockets[i].x >= 500 || rockets[i].x <= 0) {
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
/* module.exports.setCharacterList = setCharacterList;
module.exports.setCharacter = setCharacter;
module.exports.addAttack = addAttack;
*/
