const sassMiddleware          = require('node-sass-middleware');
const postcssMiddleware       = require('postcss-middleware');
const autoprefixer            = require('autoprefixer');
const path                    = require('path');


exports.sass = sassMiddleware({
    src: 'public',
    dest: 'public',
    indentedSyntax: true, // true = .sass and false = .scss
    // outputStyle: 'compressed',
    force: true,
    sourceMap: true
  })
  
  exports.prefixer = ('/stylesheets', postcssMiddleware({
    src: function(req) {
      return path.join(__dirname, 'public', 'stylesheets', req.path);
    },
    plugins: [
      autoprefixer()
    ],
    options: {
      map: {
        inline: false
      }
    }
  }
))