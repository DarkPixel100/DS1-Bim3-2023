const express = require('express')
const helpers = require("./helpers/helpers");
const path = require('path')
const bodyParser = require('body-parser');
const app = express();
const { sequelize, Sequelize } = require("./config/database");

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

const appRoutes = require("./routes/approutes")

// handlebars configuration
const handlebars = require("express-handlebars")
const handlebars_mod = require("handlebars")

const { allowInsecurePrototypeAccess } = require ("@handlebars/allow-prototype-access")

app.engine('handlebars', handlebars.engine({ 
	defaultLayout: false,
	handlebars: allowInsecurePrototypeAccess(handlebars_mod),
	helpers: helpers
}));


sequelize
  .sync()
  .then(() => {
    console.log("Database synced sucessfully");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

// view settings
app.set('views', path.join("./views"))
app.set('view engine','handlebars')

app.use(appRoutes)

app.listen(3000, () => {
	console.log('app is running');
});
