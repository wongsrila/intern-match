const User = require('../models/user');

// User Index
const userIndex = (req, res) => {
  User.find({ status: '?' })
    .then((result) => {
      const rand = Math.floor(Math.random() * result.length);
      const data = result[rand];
      res.render('userIndex', { data });
    })
    .catch((err) => {
      console.log(err);
    });
};

// User Create - GET
const userCreateGet = (req, res) => {
  res.render('userCreate');
};

// User Create - POST
const userCreatePost = (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.redirect('/users');
    })
    .catch((err) => console.log(err));
};

// User Like - POST
const userLikePost = (req, res) => {
  const id = req.body.name.trim();

  User.findOneAndUpdate({ name: id }, { status: 'liked' })
    .then(() => {
      res.redirect('/users');
    })
    .catch((err) => console.log(err));
};

// User Dislike - POST
const userDislikePost = (req, res) => {
  const id = req.body.name.trim();

  User.findOneAndUpdate({ name: id }, { status: 'disliked' })
    .then(() => {
      res.redirect('/users');
    })
    .catch((err) => console.log(err));
};

// User Likes - GET
const userLikesGet = (req, res) => {
  User.find({ status: 'liked' })
    .then((result) => {
      res.render('userLikes', { result });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  userIndex,
  userCreateGet,
  userCreatePost,
  userLikePost,
  userDislikePost,
  userLikesGet,
};
