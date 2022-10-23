//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
//lodash for lowercase search wrapper
var _ = require('lodash');

const homeStartingContent =
  'Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.';
const aboutContent =
  'Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.';
const contactContent =
  'Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.';
//array where all posts objects are saved
var posts = [];

const app = express();
//this is for pointing to our headers and footers
app.use(express.static('partials'));
//need this to use ejs
app.set('view engine', 'ejs');
//?Need this to parse out the strings to place in our code from inputs in html
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
//!challange 1:
app.get('/', function (req, res) {
  //rememember with ejs with have to render
  //!challange 2. make our homeStartingContent to display on our home page
  //here I used the same name, she said it is usually like this and she finds it
  //confusing, but for this challange, it made it easier
  //**render is used to plug into the  ejs */
  res.render('home', { homeStartingContent: homeStartingContent, posts: posts });
});

//!Challange 5 set up the about and contact pages as templates
app.get('/about', function (req, res) {
  //**render is used to plug into the ejs */
  res.render('about', { aboutContent: aboutContent });
});
//**render is used to plug into the ejs */
app.get('/contact', function (req, res) {
  res.render('contact', { contactContent: contactContent });
});
//!This will allow us to type compose and will pull up teh compose.ejs file
app.get('/compose', function (req, res) {
  res.render('compose');
});
//!This code parses our html input into our javaScript to be processed
app.post('/compose', function (req, res) {
  const blogTitleContent = req.body.blogPostTitle;
  const blogPostContent = req.body.blogPostContent;

  //console.log(blogPostContent)
  //!created a javascript object that stores the parsed post title and the post body
  var post = { title: blogTitleContent, blogContent: blogPostContent };
  //!push the object above into our posts array
  posts.push(post);
  //!used redirect here to bring us back to our home page
  res.redirect('/');
});
//!routing parameters, used to route our content to a posts page that is associated with teh post title
app.get('/posts/:postName', function (req, res) {
  //!using lodash to simplify seach parameters when typing in the title
  const requestedPostTitle = _.lowerCase(req.params.postName);
  //!!high order function: (A function that performs operarations on other functions)
  posts.forEach((post) => {
    const storedPostTitle = _.lowerCase(post.title);
    if (requestedPostTitle === storedPostTitle) {
      //**Using Render again to plug into ejs */
      res.render('post', { postTitle: post.title, postBlogContent: post.blogContent });
    }
  });
});

app.listen(3000, function () {
  console.log('Server started on port 3000');
});
