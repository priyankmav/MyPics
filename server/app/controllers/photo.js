var express = require('express'),
router = express.Router(),
logger = require('../../config/logger');
var mongoose = require('mongoose'),
Photo = mongoose.model('Photo');
multer = require('multer'),
mkdirp = require('mkdirp');