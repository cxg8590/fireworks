// our socket code for physics to send updates back
const sockets = require('./sockets.js');

const rockets = []; // array of attack to handle
const grav = 0.1;
const fuse;

// computes all physics
const gravity = () => {
  if (rockets.length > 0) {
    for (let i = 0; i < rockets.length; i++) {
        // var force = rockets[i].vel + Math.abs(rockets[i].ang);
      fuse = rockets[i].fus;
        // if(fuse)
        // +console.log("fuse: " + fuse);
        // console.log("vel: " + rockets[i].vel);
        // explodes teh rocket if at the end of fuse
      if (rockets[i].vel >= fuse && rockets[i].up) {
        rockets[i].ex = true;
      } else if (rockets[i].vel >= fuse && rockets[i].up === false) {
        console.log('explode');
        rockets[i].ex = true;
      }

      // grav PHYSICS
      rockets[i].y += rockets[i].vel;
      rockets[i].vel += grav;
        // console.log("rocket y: " + rockets[i].y);
        // console.log("rocket velY: " + rockets[i].velY);
      if (rockets[i].vel >= 0) {
        // rockets[i].vel *= -1;
        rockets[i].up = false;
      }

        // x axis physics
      rockets[i].x += rockets[i].ang;
        // console.log("ang: " + rockets[i].ang);
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
