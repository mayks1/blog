const sassMiddleware = require('node-sass-middleware');

exports.sass = sassMiddleware({
    src: 'public',
    dest: 'public',
    indentedSyntax: true, // true = .sass and false = .scss
    // outputStyle: 'compressed',
    force: true,
    sourceMap: true
  })
  