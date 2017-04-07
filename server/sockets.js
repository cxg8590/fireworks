// fast hashing library
const xxh = require('xxhashjs');
const physics = require('./physics.js');
// Character custom class
/* const Character = require('./classes/Character.js');
// our physics calculation file
const physics = require('./physics.js');

// object of user characters
const characters = {};
*/
let rockets = [];
const colors = [];
// our socketio instance
let io;

// function to notify everyone when a user has been hit
/* const handleAttack = (userHash) => {
  io.sockets.in('room1').emit('attackHit', userHash);
};
*/
// function to setup our socket server
const setupSockets = (ioServer) => {
  // set our io server instance
  io = ioServer;

  // on socket connections
  io.on('connection', (sock) => {
    console.log('connected');
    const socket = sock;

    socket.join('room1'); // join user to our socket room

    socket.on('launch', (data) => {
      console.log(`launching: ${data}`);
      // rockets[rockets.length -1] = data;
      const hash = xxh.h32(`${socket.id}${new Date().getTime()}`, 0xCAFEBABE).toString(16);
      console.log(`launching: ${hash}`);
      const tempRocket = {
        x: data.x,
        y: data.y,
        ht: data.ht,
        vel: data.velY,
        ang: data.ang,
        out: '000000',
        in: 'FFFFFF',
        id: hash,
      };
      console.log(`temp y: ${tempRocket.y}`);
      console.log(`temp ht: ${tempRocket.ht}`);
      io.sockets.in('room1').emit('getID', hash);
      physics.addRocket(tempRocket);
    });

    socket.on('colorPack', (data) => {
      colors.push(data);
    });

    // when the user disconnects
    socket.on('disconnect', () => {
      // let everyone know this user left
      /* io.sockets.in('room1').emit('left', characters[socket.hash]);
      // remove this user from our object
      delete characters[socket.hash];
      // update the character list in our physics calculations
      physics.setCharacterList(characters);*/

      // remove this user from the socket room
      socket.leave('room1');
    });
  });
};

const handleFlight = (e) => {
  rockets = e;
  for (let i = 0; i < rockets.length; i++) {
    for (let j = 0; j < colors.length; j++) {
      if (rockets[i].id === colors[j].id) {
        rockets[i].out = colors[j].out;
        rockets[i].in = colors[j].in;
      }
    }
  }
  io.sockets.in('room1').emit('soaring', rockets);
};

module.exports.setupSockets = setupSockets;
module.exports.handleFlight = handleFlight;
