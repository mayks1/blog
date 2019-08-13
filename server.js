const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
// LODASH
// const _ = require('lodash');
// const sassMiddleware = require('node-sass-middleware');
const sassCompiler = require('./utils/sass');
const viewPath = path.join(__dirname, 'views');
const publicPath = path.join(__dirname, 'public');
const port = process.env.PORT || 3000;


const app = express();

// Require ROUTES
const homeRoutes      = require('./routes/home');
const aboutRoutes     = require('./routes/about');
const contactRoutes   = require('./routes/contact');
const composeRoutes   = require('./routes/compose');
const postRouts       = require('./routes/posts');

// Error Controller
const errorControler  = require('./controllers/404');


//Use SASS
app.use(sassCompiler.sass);

app.set('views', viewPath);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(publicPath));


app.use(homeRoutes);
app.use(aboutRoutes);
app.use(contactRoutes);
app.use(composeRoutes);
app.use(postRouts);
app.use(errorControler.get404);


app.listen(port, function() {
  console.log("Server started on port 3000");
});

