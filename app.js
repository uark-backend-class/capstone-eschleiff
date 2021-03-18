const express = require('express');
const path = require('path');
const pug = require('pug');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const passport = require('passport');
const { initialize } = require('passport');

//Create express app
const app = express(); 

//This is the folder that has the hbs or pug  files
app.set('views', path.join(__dirname, 'views'));

//Sets pug as my viewing engine
app.set('view engine', 'pug');
//app.set('view engine', 'hbs');

// Pare url encoded data and put it into req.body
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON data and put it into req.body
app.use(express.json());

//app.use(passport.initialize());
//app.use(passport.session());

app.use(routes);

module.exports = app;
