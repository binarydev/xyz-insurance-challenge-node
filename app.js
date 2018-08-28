require('dotenv').config()

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newsRouter = require('./routes/articles');

var app = express();
const env_stage = process.env.NODE_ENV || 'development';

app.use(logger(env_stage));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

app.use('/users', usersRouter);
app.use('/articles', newsRouter);
app.use('/', indexRouter);

module.exports = app;
