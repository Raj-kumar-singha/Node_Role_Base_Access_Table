const express = require("express"),
    dotenv = require("dotenv"),
    obj = require('./models/index'),
    bodyParser = require('body-parser'),
    Router = require('./routes/index'),
    app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(express.json());
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
