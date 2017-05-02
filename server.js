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
const Meal = require('./models/mealModel.js');
const path = require('path');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');

const compiler = webpack(config);

const PORT = process.env.PORT || 3000;
const MONGOURI = process.env.MONGOURI;
const key = process.env.EDAMAMKEY;
const accountSid = process.env.TWILIO_AUTH_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const testNumber = process.env.TESTNUMBER;
const twilioNumber = process.env.TWILIONUMBER;

const client = require('twilio')(accountSid, authToken);


const conn = mongoose.connection;
mongoose.connect(MONGOURI);

const app = express();

let currentUser;

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

app.put('/update_user', (req, res) => {
  User.update({ username: req.body.username }, req.body, { overwrite: true }, (err) => {
    if (!err) {
      return res.send(200);
    }
    return res.send(500);
  });
});

app.get('/get_user/*', (req, res) => User.findOne({ username: req.params[0] }).then(suc => res.send(suc)));

app.post('/check_user', (req, res) => {
  const username = req.body.profile.nickname;
  const phoneNumber = req.body.profile.phoneNumber;
  const email = req.body.profile.email;
  const image = req.body.profile.picture;
  currentUser = username;

  const user = new User({ username, phoneNumber, email, image });

  User.findOne({ username }, (err) => {
    if (err) {
      console.error(err, 'Error');
      res.send('Error');
    } else {
      user.save((error, person) => {
        if (error) {
          console.error(error, 'Error');
        } else {
          res.send(person);
        }
      });
    }
  });
});

app.post('/my_ingredients', (req, res) => {
  const ingredient = req.body.ingredient;

  User.updateOne({ username: currentUser },
    { $push: { currentListOfIngredients: ingredient } }, (err, data) => {
      if (err) {
        console.error(err, 'Error');
      } else {
        res.send(data);
      }
    });
});


app.get('/my_ingredients/*', (req, res) => {
  currentUser = req.params[0];

  User.find({ username: currentUser }, 'currentListOfIngredients', (err, data) => {
    if (err) {
      console.error(err, 'Error');
    } else {
      res.send(data[0].currentListOfIngredients);
    }
  });
});

app.delete('/delete_ingredient/*', (req, res) => {
  const item = req.params[0];
  User.findOneAndUpdate({ username: currentUser },
  { $pull: { currentListOfIngredients: item } }, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const del = data.currentListOfIngredients.indexOf(item);
      data.currentListOfIngredients.splice(del, 1);
      res.send(data.currentListOfIngredients);
    }
  });
});

app.get('/find_recipe/*', (req, res) => {
  const query = req.params[0].replace('/', '%20');

  axios.get(`http://api.edamam.com/search?q=${query}`, {
    headers: { key },
  })
    .then((resp) => {
      res.send(resp.data);
    })
    .catch((err) => {
      console.error(err);
    });
});


app.post('/save_recipe', (req, res) => {
  const recipeName = req.body.recipe;

  const newRecipe = new Recipe({
    recipeName: recipeName.name,
    image: recipeName.image,
    ingredients: recipeName.ingredients,
    url: recipeName.url,
  });

  Recipe.find({ recipeName: recipeName.name }, (err) => {
    if (err) {
      console.error(err, 'Error!');
    } else {
      newRecipe.save((error, result) => {
        if (error) {
          console.error(error, 'Error on save');
          Recipe.updateOne({ recipeName: recipeName.name },
            { $push: { likedBy: currentUser } }, (prob, success) => {
              if (err) {
                console.error(prob, 'Error');
              } else {
                res.send(success);
              }
            });
        } else {
          User.updateOne({ username: currentUser },
            { $push: { likedRecipes: result.recipeName } }, (problem) => {
              if (err) {
                console.error(problem, 'Error');
              } else {
                Recipe.updateOne({ _id: result._id },
                  { $push: { likedBy: currentUser } }, (prob, success) => {
                    if (err) {
                      console.error(prob, 'Error');
                    } else {
                      res.send(success);
                    }
                  });
              }
            });
        }
      });
    }
  });
});

app.get('/lets_eat', (req, res) => {
  client.messages.create({
    to: `+${testNumber}`,
    from: `+${twilioNumber}`,
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    mediaUrl: 'https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg',
  }, (err, message) => {
    if (err) {
      console.error(err, 'Error');
    } else {
      res.send(message);
    }
  });
});

app.get('/my_meals/*', (req, res) => {
  User.find({ _id: req.params[0] }).then((err, suc) => {
    if (!err) {
      return res.send(200, suc);
    }
    return res.send(500, err);
  });
});

app.post('/make_new_meal', (req, res) => {
  const host = req.body.data.meal.host;
  const teamFridge = req.body.data.meal.teamFridge;
  const location = req.body.data.meal.location;
  const time = req.body.data.meal.time;
  const meal = new Meal({
    host,
    teamFridge,
    location,
    time,
    people: [],
    ingredients: [],
    missingIngredients: [],
    tenMatches: [],
    topThree: [],
  }).save().then((err, suc) => {
    if (!err) {
      return res.send(200, suc);
    }
    return res.send(500, err);
  });
});

app.put('/update_meal', (req, res) => {
  const options = { overwrite: true };
  Meal.updateOne({ _id: req.body.meal._id }, req.body.meal, options, (err, suc) => {
    if (!err) {
      return res.send(200, suc);
    }
    return res.send(500, err);
  });
});

app.get('/meal_needs/*', (req, res) => {
  Meal.find({ _id: req.params[0] }).then((err, suc) => {
    if (!err) {
      return res.send(200, suc.missingIngredients);
    }
    return res.send(500, err);
  });
});

app.get('/fav_recipes/*', (req, res) => {
  User.find({ email: req.params[0] }, 'likedRecipes', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.send(data[0]);
    }
  });
});

app.get('/get_matching_users/*', (req, res) => {
  User.find({ username: new RegExp(req.params[0], 'i') }, (err, results) => {
    if (!err) {
      return res.send(200, results);
    }
  });
});

app.post('/add_friend', (req, res) => {
  User.updateOne({ username: req.body.body[0] },
   { $push: { friendsList: req.body.body[1] } }, (err) => {
     if (err) {
       console.error(err, 'Error');
     } else {
       User.updateOne({ username: req.body.body[1] },
        { $push: { friendsList: req.body.body[0] } }, (error, success) => {
          if (error) {
            console.error(error, 'Error');
          } else {
            User.find({ username: req.body.body[0] }, 'friendsList', (problem, friends) => {
              if (problem) {
                console.error(problem, 'Error');
              } else {
                res.send(friends);
              }
            });
          }
        });
     }
   });
});

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'index.html')));
