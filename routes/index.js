const express = require('express');
const router = express.Router();
const Movie = require('../public/models/Movie')
const controllerFunc = require('./controller')

// use controller function for postman
router.get('/movies',controllerFunc.getMovieFunc)
router.post('/addmovie',controllerFunc.postNewMovie)
router.put('/:title',controllerFunc.updateMovie)
router.delete('/:title',controllerFunc.deleteMovie)




module.exports = router;
