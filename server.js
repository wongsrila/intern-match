const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const random = require('mongoose-random');
// const User = require('./models/user');
const Account = require('./models/account');

// Express app
const app = express();
dotenv.config();

// DB connection
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@internmatch.bgqjg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

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
// app.get('/users', user_index);
// app.get('/users/create', user_create_get);
// app.post('/users/create', user_create_post);
// app.get('/account', account_index);
app.get('/account/edit', account_edit_get);
app.post('/account/edit', account_edit_post);

function home(req, res) {
  const meta = {
    headTitle: 'Intern Match | Account',
    css: 'index.css',
  };

  // Account.countDocuments({}, function (err, count) {
  //   const rand = Math.floor(Math.random() * count);
  //   Account.find({ liked: 'on' })
  //     .then((result) => {
  //       // const data = result[rand];
  //       // res.render('index', { meta });
  //       console.log(result.length);
  //       // res.send(info);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });

  Account.find({ liked: 'on' })
    .then((result) => {
      const rand = Math.floor(Math.random() * result.length);
      const data = result[rand];
      res.render('index', { data, meta });
    })
    .catch((err) => {
      console.log(err);
    });
}

function account_edit_get(req, res) {
  const meta = {
    headTitle: 'Intern Match | Account',
    css: 'account.css',
  };
  res.render('account_edit', { meta });
}

function account_edit_post(req, res) {
  const account = new Account(req.body);

  account
    .save()
    .then((result) => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
}
