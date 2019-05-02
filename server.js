const express = require('express');
const app = express();
var exprhbs = require('express-handlebars');
// const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const keys = require('./keys');
const methodOverride = require('method-override');
const htmlRoutes = require('./Routes/htmlRoutes');
let player = require('./controllers/player');

// app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(methodOverride('X-HTTP-Method-Override'));

app.engine("handlebars", exprhbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const MONGODB_URI = process.env.MONGODB_URI || keys.DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', () => {
    console.log('We Have A Connection Muahahah');
});
db.on('error', (err) => {
    console.log('database error... ', err);
});

app.use(htmlRoutes);
app.use(player);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('File Not Found');
    err.status = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});
app.listen(PORT, function () {
    console.log('THE APP IS RUNNING BRO! ' + PORT);
});