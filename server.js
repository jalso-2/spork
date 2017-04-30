/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
require('dotenv').config();

const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const webpack = require('webpack');
const config = require('./webpack.config.dev.js');
const User = require('./models/userModel.js');
const Recipe = require('./models/recipeModel.js');
const path = require('path');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');

const compiler = webpack(config);

const PORT = process.env.PORT || 3000;
const MONGOURI = process.env.MONGOURI;
const testIdKey = process.env.DBTESTID;
const key = process.env.EDAMAMKEY;
const accountSid = process.env.TWILIO_AUTH_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const testNumber = process.env.TESTNUMBER;
const twilioNumber = process.env.TWILIONUMBER;

const client = require('twilio')(accountSid, authToken);


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
app.use(cors());
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));
app.use(require('webpack-hot-middleware')(compiler));
/* ***********End MiddleWare************** */

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    // YOUR-AUTH0-DOMAIN name e.g prosper.auth0.com
    jwksUri: process.env.AUTH0_JWKS_URI,
  }),
    // This is the identifier we set when we created the API
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ['RS256'],
});


app.post('/test_user', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const user = new User({ username, password, phoneNumber, email });

  user.save((err) => {
    if (err) {
      console.error(err, 'Error');
    } else {
      console.log('saved to database');
      res.send('Hello form the other side');
    }
  });
});


app.post('/my_ingredients', authCheck, (req, res) => {
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

app.get('/my_ingredients', authCheck, (req, res) => {
  const id = testIdKey;

  User.find({ _id: id }, 'currentListOfIngredients', (err, data) => {
    if (err) {
      console.error(err, 'Error');
    } else {
      res.send(data[0].currentListOfIngredients);
    }
  });
});

app.get('/find_recipe/*', authCheck, (req, res) => {
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

app.post('/save_recipe', authCheck, (req, res) => {
  const recipeName = req.body.recipe;
  const id = testIdKey;

  const newRecipe = new Recipe({
    recipeName: recipeName.name,
    image: recipeName.image,
    ingredients: recipeName.ingredients,
    url: recipeName.url });

  Recipe.find({ recipeName: recipeName.name }, (err, data) => {
    if (err) {
      console.error(err, 'Error!');
    } else {
      console.log(data, 'newRecipe');
      newRecipe.save((error, result) => {
        if (error) {
          console.error(error, 'Error on save');
          Recipe.updateOne({ recipeName: recipeName.name }, { $push: { likedBy: id } }, (prob, success) => {
            if (err) {
              console.error(prob, 'Error');
            } else {
              console.log(success, 'updated');
              res.send('in there like swimwear!!!');
            }
          });
        } else {
          console.log(result, 'result');
          User.updateOne({ _id: id }, { $push: { likedRecipes: result._id } }, (problem, updated) => {
            if (err) {
              console.error(problem, 'Error');
            } else {
              console.log(updated, 'updated');
              Recipe.updateOne({ _id: result._id }, { $push: { likedBy: id } }, (prob, success) => {
                if (err) {
                  console.error(prob, 'Error');
                } else {
                  console.log(success, 'updated');
                  res.send('in there like swimwear!!!');
                }
              });
            }
          });
        }
      });
    }
  });
});

app.get('/lets_eat', authCheck, (req, res) => {
  client.messages.create({
    to: `+${testNumber}`,
    from: `+${twilioNumber}`,
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    mediaUrl: 'https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg',
  }, (err, message) => {
    if (err) {
      console.error(err, 'Error');
    } else {
      console.log(message);
      res.send('howdy do');
    }
  });
});

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'index.html')));
