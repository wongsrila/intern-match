const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const indexRoutes = require('./src/routes/indexRoute');
const userRoutes = require('./src/routes/userRoute');

const app = express();
mongoose.set('useFindAndModify', false);
dotenv.config();
const port = process.env.PORT || 3000;

// DB Connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/mvc-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected successful'))
  .catch((err) => console.log(err));

// Middlewaret
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', indexRoutes);
app.use('/users', userRoutes);

// app.get('/profile', (req, res) => {
//   res.render('multer');
// });

// app.post('/profile', upload.single('avatar'), (req, res) => {
//   console.log(req.file);
//   res.redirect('/profile');
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
