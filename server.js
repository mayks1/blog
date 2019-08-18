const express               = require("express");
const path                  = require('path');
const bodyParser            = require("body-parser");
const sassCompiler          = require('./utils/sass');
const viewPath              = path.join(__dirname, 'views');
const port                  = process.env.PORT || 3000;

const app = express();


// Require ROUTES
const homeRoute      = require('./routes/home');
const aboutRoute     = require('./routes/about');
const contactRoute   = require('./routes/contact');
const composeRoute   = require('./routes/compose');
const postRoute      = require('./routes/posts');
const editPostRout   = require('./routes/edit');
const updatePostRout = require('./routes/update');
const deletePostRoute     = require('./routes/delete');

// Error Controller
const errorControler  = require('./controllers/404');


//Use SASS
app.use(sassCompiler.sass);

app.set('views', viewPath);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));


app.use(homeRoute);
app.use(aboutRoute);
app.use(contactRoute);
app.use(composeRoute);
app.use(postRoute);
app.use(editPostRout);
app.use(updatePostRout);
app.use(deletePostRoute);
app.use(errorControler.get404);


app.listen(port, function() {
  console.log("Server started on port 3000");
});

