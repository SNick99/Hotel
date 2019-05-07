import "dotenv/config";
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
import routes from "./routes";
import models, { sequelize } from "./models";

const app = express();

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.context = {
    models,
    //me: await models.User.findByLogin("Dima"),
  };

  next();
});

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

// Routes
app.use("/employee", routes.employee);
app.use("/schedule", routes.schedule);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(async () => {
  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
});
