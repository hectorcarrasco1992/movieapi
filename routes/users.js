var express = require('express');
var router = express.Router();
const Movie = require('../public/models/Movie')

/* GET addmovie render */
router.get('/addmovie', function(req, res, next) {
  res.render('addMovie',{Movie:null});
});

// get all movies render
router.get('/',(req,res)=>{
  Movie.find({})
  .then(movie =>{
      //return res.status(200).json(words)
      console.log(movie)
      return res.render('index',{movie})
  })
})

// find movie

router.get('/findmovie',(req,res)=>{
  return res.render('findMovie',{movie:null})
})

router.get('/foundmovie',(req,res)=>{
  // find the movie based on  searchbox query in findWord.ejs
  // after the find one make sure you match which input the search will based on
  // so title:req.query.title will search based on the title they put in the title box
   Movie.findOne({title:req.query.title})
  .then((movie)=>{
   if(movie){
       return res.render('findMovie', {movie})
   }else{
       return res.status(400).json({message:'no movie found',err})
  }
   }).catch(err => res.status(500).json({message:'server error',err}))
})
module.exports = router;
