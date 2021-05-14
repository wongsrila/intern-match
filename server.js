const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');
const account = require('./models/account');

// Express app
const app = express();
dotenv.config();

// DB connection
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@internmatch.bgqjg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Data table
const data = {
  quote: 'Ik zoek een stagebedrijf dat mij kan helpen met Javascript',
  imgURI: 'images/intern1.png',
  name: 'John Doe',
  sumary: 'Design student at Hogeschool van Amsterdam',
};

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', home);
app.get('/users', user_index);
app.get('/users/create', user_create_get);
app.post('/users/create', user_create_post);
app.get('/account', account_index);
app.get('/account/edit', account_edit_get);
app.post('/account/edit', account_edit_post);

// Controllers
function home(req, res) {
  res.render('index', {
    meta: {
      headTitle: 'Intern Match | Home',
      css: 'index.css',
    },
    data,
  });
}

function account_index(req, res) {
  User.findOne({})
    .then((data) => {
      res.render('account_edit', {
        meta: {
          headTitle: 'Intern Match | Account',
          css: 'account.css',
        },
        data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// Find account
function account_edit_get(req, res) {
  User.findOne({})
    .then((data) => {
      res.render('account_edit', {
        meta: {
          headTitle: 'Intern Match | Account',
          css: 'account.css',
        },
        data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function account_edit_post(req, res) {
  console.log(req.body);
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
