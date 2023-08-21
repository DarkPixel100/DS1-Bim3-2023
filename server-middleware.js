const express = require('express')



const path = require('path')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

const appRoutes = require("./routes/approutes")

// handlebars configuration
const handlebars = require("express-handlebars")
const handlebars_mod = require("handlebars")

const { allowInsecurePrototypeAccess } = require ("@handlebars/allow-prototype-access")

app.engine('handlebars', handlebars.engine({ 
	defaultLayout: false,
	handlebars: allowInsecurePrototypeAccess(handlebars_mod)
}));

app.set('views', path.join("./views"))
app.set('view engine','handlebars')

app.use('/users', (req, res, next) => {
	console.log('will run before users route');
	next();
});

app.use(appRoutes)

app.listen(3000, () => {
	console.log('app is running');
});
