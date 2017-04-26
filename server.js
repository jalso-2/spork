/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

require('dotenv').config();
const path = require('path');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const webpack = require('webpack');
const config = require('./webpack.config.dev.js');
const User = require('./models/userModel.js');
const Recipe = require('./models/recipeModel.js');
const compiler = webpack(config);

const PORT = process.env.PORT || 3000;
const MONGOURI = process.env.MONGOURI;
const testIdKey = process.env.DBTESTID;
const key = process.env.EDAMAMKEY;

const conn = mongoose.connection;
mongoose.connect(MONGOURI);

const app = express();

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', (err) => {
  if (err) {
    console.error(err, 'Error');
  } else {
    app.listen(PORT, () => console.log(`Server is up and listening on port ${PORT}!`));
  }
});

/* ***********Start MiddleWare************** */
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));
app.use(require('webpack-hot-middleware')(compiler));
/* ***********End MiddleWare************** */

app.post('/test_user', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = new User({ username, password });

  user.save((err) => {
    if (err) {
      console.error(err, 'Error');
    } else {
      console.log('saved to database');
      res.send('Hello form the other side');
    }
  });
});


app.post('/my_ingredients', (req, res) => {
  const id = testIdKey;
  const ingredient = req.body.ingredient;

  User.updateOne({ _id: id }, { $push: { currentListOfIngredients: ingredient } }, (err, data) => {
    if (err) {
      console.error(err, 'Error');
    } else {
      res.send('Hello Moto!');
    }
  });
});

app.get('/my_ingredients', (req, res) => {
  const id = testIdKey;

  User.find({ _id: id }, 'currentListOfIngredients', (err, data) => {
    if (err) {
      console.error(err, 'Error');
    } else {
      res.send(data[0].currentListOfIngredients);
    }
  });
});

app.get('/find_recipe/*', (req, res) => {
  console.log(req.params[0], 'params');
  console.log('inside find recipe');

  const query = req.params[0].replace('/', '%20');

  axios.get(`http://api.edamam.com/search?q=${query}`, {
    headers: { key },
  })
    .then((resp) => {
      console.log(resp.data, 'DATAAAAA!!!!!!!');
      res.send(resp.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'index.html')));
