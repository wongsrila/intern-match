const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv")

// Express app
const app = express();
dotenv.config();

// database connection
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@internmatch.bgqjg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// Middleware

