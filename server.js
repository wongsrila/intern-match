const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');

// Express app
const app = express();
dotenv.config();

// DB connection
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@internmatch.bgqjg.mongodb.net/intern-match?retryWrites=true&w=majority`;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', home);
app.get('/users', user_index);
app.get('/users/create', user_create_get);
app.post('/users/create', user_create_post);

// Controllers
function home(req, res) {
  res.render('index', {
    headTitle: 'Home',
    css: 'index.css',
    data: {
      quote: 'Ik zoek een stagebedrijf dat mij kan helpen met Javascript',
    },
  });
}

function user_index(req, res) {
  res.render('user_index');
}

function user_create_get(req, res) {
  res.render('user_create');
}

function user_create_post(req, res) {
  console.log(req.body);
  const user = new User(req.body);
  user
    .save()
    .then((result) => {
      res.redirect('/users');
    })
    .catch((err) => {
      console.log(err);
    });
}
