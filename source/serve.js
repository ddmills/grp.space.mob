var express = require('express');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3002);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

var router = express.Router();

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

app.use('/', express.static(__dirname + '/public'));
// app.use('/', router);

console.log('Serving on: ' + app.get('ip') + ':' + app.get('port'));
app.listen(app.get('port'), app.get('ip'));
