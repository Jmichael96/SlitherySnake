const express = require('express');
const app = express();
const exprhbs = require('express-handlebars');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const connectDB = require('./services/db');
// const methodOverride = require('method-override');
const htmlRoutes = require('./Routes/htmlRoutes');
let player = require('./controllers/player');

// * connect to the database!
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
// app.use(methodOverride('X-HTTP-Method-Override'));

app.engine("handlebars", exprhbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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