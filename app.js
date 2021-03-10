const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const passport = require('passport');
const { initialize } = require('passport');

//Create express app
const app = express(); 

//This is the folder that has the hbs or pug  files
app.set('views', path.join(__dirname, 'views'));

//Sets pug as my viewing engine
app.set('view engine', 'pug');

//
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true}))
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

//app.use(passport.initialize());
//app.use(passport.session());

app.use(routes);

module.exports = app;
