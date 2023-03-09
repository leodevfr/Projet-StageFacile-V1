const express = require ('express')
const Sequelize = require('sequelize')
const session = require('express-session')
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require("path");
//paramètre express
const app = express();
const router = require('./API/router');


//paramètre sequelize
const db = require('./config')
try {
    db.authenticate();
    console.log('Connexion a la BDD efféctué.');
  } catch (error) {
    console.error('Pas de connexion:', error);
  }

//parametre express session
  app.use(session({
    secret: 'keyboard cat',
    store: new SequelizeStore({
      db:db
    }),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))


//parametre bodyparser
app.use(express.urlencoded({extended: true}))

//Mise en place des dossiers static
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

//fonctionnement du serveur
app.use('/', router)

app.listen(3000, function () {
    console.log(`http://localhost:3000`)
    
});
