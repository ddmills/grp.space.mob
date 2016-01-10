var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');

var router = express.Router();

router.get('/at/:room', function(req, res) {
    var room = req.params.room;
    res.render('room/index', { room : room });
});

router.get('/', function(req, res) {
    res.render('index');
});

app.use('/', express.static(__dirname + '/public'));
app.use('/', router);

app.listen(3000);
