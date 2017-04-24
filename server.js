require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const webpack = require('webpack');
const config = require('./webpack.config.dev.js');

const compiler = webpack(config);

const PORT = process.env.PORT || 3000;

const app = express();

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

app.listen(PORT, () => console.log(`Server is up and listening on port ${PORT}!`));
