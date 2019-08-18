const mongoose = require("mongoose");
const _ = require('lodash');


const homeStartingContent = "Тук ще се опитам да ви покажа как можете да работите по-ефективно и да анализирате по-добре своите данни, чрез възможностите, които предоставя Express.JS ."
const contactContent = "За да се свържете с мен, моля използвайте формата за контакти:"
const aboutContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."


mongoose.connect("mongodb://localhost:27017/blog1DB", {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

const postSchema = {
  title: String,
  content: String,
  url: String
};

const Post = mongoose.model("Post", postSchema);

// GET HOME PAGE
exports.getHome = (req, res) => {

  Post.find({}, (err, foundPosts) => {
    if (err) {
      console.log(err);
    } else {
      res.render('home', { 
        pageTitle : 'Начало',
        startingContent: homeStartingContent,
        posts: foundPosts
       });
    }
  });
}

//GET ABOUT PAGE
exports.getAbout = (req, res) => {
    res.render('about', { 
      pageTitle : 'За Мен',
      aboutContent: aboutContent 
    });
}

//GET CONTACT PAGE
exports.getContact = (req, res) => {
    res.render('contact', { 
      pageTitle : 'Контакт',
      contactContent: contactContent
    });
}

// GET COMPOSE PAGE
exports.getCompose = (req, res) => {
    res.render('compose', { pageTitle : 'Compose' });
}


// POST COMPOSE
exports.postCompose = (req, res) => {
  const reqUrl = _.kebabCase(req.body.postTitle);
  
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postContent,
    url: reqUrl
  });

  post.save();

  res.redirect("/");
}

// GET POSTS PAGE
exports.getPost = (req, res) => {

  const requestedPostUrl = req.params.postUrl;

  Post.findOne({url: requestedPostUrl}, (err, foundPost) => {
    if (err) {
      console.log(err);
    } else {
      res.render('post', { post: foundPost, pageTitle: foundPost.title});
    }
  
  });
}

// DELETE POST
exports.deletePost = (req, res) => {
 const reqPost = req.body.postUrl;

 Post.deleteOne({ url: reqPost }, (err) => {
   if (err) {
     console.log(err)
   }
 });

 res.redirect("/");
}

// EDIT POST
exports.editPost = (req, res) => {

  const requestedPostUrl = req.params.postUrl;

  Post.findOne({url: requestedPostUrl}, (err, foundPost) => {
    if (err) {
      console.log(err);
    } else {
      res.render('edit', { post: foundPost, pageTitle: foundPost.title});
    }
  
  });

}
// UPDATE POST
exports.updatePost = (req, res) => {

  const requestedPostUrl = req.params.postUrl;

  Post.findOneAndUpdate({url: requestedPostUrl}, req.body.post, (err, updatedpost) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.redirect('/posts/' + req.params.postUrl);
    }
  });
}