var express = require('express');
var app = express();

//app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');

var router = express.Router();

app.use('/', express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/public/css'));
//app.use('/static', express.static(__dirname + '/public'));


router.get('/at/:room', function(req, res) {
    var room = req.params.room;
    res.render('room/index', { name : room });
});

app.use('/', router);

app.listen(3000);
