const express = require('express'),
  dotenv = require('dotenv'),
  obj = require('./models/index'),
  bodyParser = require('body-parser'),
  Router = require('./routes/index'),
  // session = require('express-session'),
  cookieSession = require('express-session'),
  cors = require('cors'),
  app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: 'raj-session',
    secret: process.env.sessionSecret,
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 5 * 60 * 60 * 1000, // 5 min, Auto expire
      }
  })
);

// app.use(session({
//     secret: process.env.sessionSecret,
//     resave: false,
//     saveUninitialized: true
//   }));

app.use('/api', Router);

app.use((req, res, next) => {
  res.status(404).json({
    error: 'Bad Request',
  });
});

obj.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });

// obj.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

app.listen(process.env.PORT, () => {
  console.log(`Server Running on Port number ${process.env.PORT}`);
});
