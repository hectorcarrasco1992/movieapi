const express = require('express');
const router = express.Router();
const Movie = require('../public/models/Movie')
const controllerFunc = require('./controller')

// use controller functions to render
router.get('/addmovie',controllerFunc.addMovieRender)
router.get('/',controllerFunc.getAllMoviesRender)
router.get('/findmovie',controllerFunc.findMovie)
router.get('/foundmovie',controllerFunc.foundMovieFunc)
module.exports = router;
