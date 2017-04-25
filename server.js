/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

require('dotenv').config();
const path = require('path');
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

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'index.html')));

