var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


var app = express();
var mongojs = require('mongojs');

var db = mongojs('clientkeeper', ['clients']);

app.use(express.static(__dirname , 'public'));