let express = require('express');
let bodyParser = require('body-parser');
let ejs = require('ejs');
let app = express();

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

let routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('File not found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
	message: err.message,
	error: {}
    });
});

// listen on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
