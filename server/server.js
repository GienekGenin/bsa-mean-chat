const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const mongojs = require('mongojs');
// const db = mongojs('mongodb://Gennadii:1q2w120195@ds135061.mlab.com:35061/bsa-js', ['messages']);
const handler = require('./scripts/bot');

const app = express();

//Set static folder for Angular
let staticPath = path.normalize(__dirname + '/../dist');
app.use(express.static(staticPath));

// Catch all other routes and return the index file
app.get('/', function (req, res) {
  res.sendFile(staticPath + '/index.html');
});

//Body Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('port', process.env.PORT || 8080);

let server = app.listen(process.env.PORT || 8080, function () {
  let port = server.address().port;
  console.log("App now running on port", port);
});

messages = [];

const io = require('socket.io')(server);
//Socket connection
io.on('connection', (socket) => {
  console.log('New connection made');

  //Test Messages
  socket.on('Client_asking', (data) => {
    console.log(data.msg);
  });

  //Emit a message when we load the browser window
  socket.emit('Server_asking', {
    msg: 'Server to client, do u read me? Over.'
  });

  socket.on('Client_response', (data) => {
    console.log(data.msg);
    socket.emit('Server_response', {
      msg: 'Loud and clear'
    })
  });

  socket.emit('new_connection', {
    messages
  });

  socket.on('new_message', (data) => {
    messages.push(data.msg);
    io.emit('new_message', {
      msg: data.msg
    });
    botCheck(data.msg);
  });
});

function botCheck(msg) {
  let botRes = new handler().check(msg);
  if(botRes){
    messages.push(botRes);
    io.emit('new_message', {
      msg: botRes
    });
  }
}
