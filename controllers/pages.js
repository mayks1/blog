const fs        = require('fs');
const path      = require('path');

const homeStartingContent = "Тук ще се опитам да ви покажа как можете да работите по-ефективно и да анализирате по-добре своите данни, чрез възможностите, които предоставя Express.JS ."
const contactContent = "За да се свържете с мен, моля използвайте формата за контакти:"
const aboutContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
const _ = require('lodash');
const dataPath = path.join(path.dirname(process.mainModule.filename), 'data', 'posts.json');

let posts = [];


exports.getHome = (req, res) => {

  fs.readFile(dataPath, (err, fileContent) => {
    if (err) {
      posts = [];
      console.log(err);
    } else {

      posts = JSON.parse(fileContent);

    res.render('home', { 
      pageTitle : 'Начало',
      startingContent: homeStartingContent,
      posts: posts
     });

    }
    
  });
};

exports.getAbout = (req, res) => {
    res.render('about', { 
      pageTitle : 'За Мен',
      aboutContent: aboutContent 
    });
}

exports.getContact = (req, res) => {
    res.render('contact', { 
      pageTitle : 'Контакт',
      contactContent: contactContent
    });
}

exports.getCompose = (req, res) => {
    res.render('compose', { pageTitle : 'Compose' });
}

exports.postCompose = (req, res) => {

  //Recive the Post from the FORM
  post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  //Read the Posts from file
  fs.readFile(dataPath, (err, fileContent) => {
    if (err) {
      posts = [];
      console.log(err);
    } else {

      posts = JSON.parse(fileContent);

      // Add post to the Array
      posts.push(post);
      fs.writeFile(dataPath, JSON.stringify(posts), (err) => {
        console.log(err);
      });
      res.redirect('/');

    }
    
  });
}

exports.getPost = (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);

  fs.readFile(dataPath, (err, fileContent) => {
    if (err) {
      console.log(err);
    } else {

      posts = JSON.parse(fileContent);

      posts.forEach( post => {
        const storedTitle = _.lowerCase(post.title);

        if (storedTitle === requestedTitle) {
          res.render('post', { post: post, pageTitle: post.title});
        } 
      });

    }
  });  

}