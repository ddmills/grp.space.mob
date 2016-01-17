var
    express  = require('express'),
    http     = require('http'),
    socketio = require('socket.io')
;

var app    = express();
var server = http.Server(app);
var io     = socketio(server);
var router = express.Router();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3002);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

router.get('/at/:room', function(req, res) {
    var room = req.params.room;
    res.render('room/index', { room : room, env : { 'room' : room } });
});

router.get('/style', function(req, res) {
    res.render('style');
});

router.get('/', function(req, res) {
    res.render('index');
});

io.on('connection', function(socket){
  console.log('[SOCKET][connection]');

  socket.on('disconnect', function(){
      console.log('[SOCKET][disconnect]');
      socket.broadcast.emit('chat-user-disconnect');
  });

  socket.on('chat-send-message', function(msg){
    console.log('[SOCKET][chat-send-message]: ' + msg);
    io.emit('chat-recieve', msg);
  });

});


app.use('/', express.static(__dirname + '/public'));
app.use('/', router);

console.log('Serving on: ' + app.get('ip') + ':' + app.get('port'));
server.listen(app.get('port'), app.get('ip'));
