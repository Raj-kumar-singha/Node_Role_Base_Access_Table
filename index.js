const express = require("express"),
    dotenv = require("dotenv"),
    obj = require('./models/index'),
    bodyParser = require('body-parser'),
    Router = require('./routes/index'),
    cookieSession = require("cookie-session"),
    cors = require("cors"),
    app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "rajkumar-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
  })
);
app.use("/api", Router);

app.use((req, res, next) => {
    res.status(404).json({
        error: "Bad Request"
    });
});

obj.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
});

// obj.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

app.listen(process.env.PORT, () => {
    console.log(`Server Running on Port number ${process.env.PORT}`);
});
