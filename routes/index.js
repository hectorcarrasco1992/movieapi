const express = require('express');
const router = express.Router();
const Movie = require('../public/models/Movie')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// get all the movies
router.get('/movies',(req,res)=>{
  Movie.find({})
  .then((movie)=>{
    return res.status(200).json(movie)
  }).catch(err=>res.status(400).json('server error'))

})

//add a movie

router.post('/addmovie',(req,res)=>{
  // validate input
  if(!req.body.title|| !req.body.rating||!req.body.synopsis||!req.body.release||!req.body.genre||!req.body.director||!req.body.box){
      return res.status(400).json({message:'all in puts must be filled'})
  }
  //check if box is unique
  //use the Movie model and the mongoose method to compare word in db to input word  respectively
  Movie.findOne({movie:req.body.box})
  .then((box)=>{
      // if the word is found  stop code and send message 
      if(box){
          return res.status(500).json({message:'box office sales should be unique'})
      }
  })
  
  
  //create movie to add
  
  const newMovie = new Movie()
  newMovie.title = req.body.title
  newMovie.rating = req.body.rating
  newMovie.synopsis = req.body.synopsis
  newMovie.release = req.body.release
  newMovie.genre = req.body.genre
  newMovie.director = req.body.director
  newMovie.box = req.body.box

  //add movie to data base
  
  // .save saves the new movie
  newMovie.save()
  .then((movie)=>{
      res.status(200).json({message:'success movie has been added',movie})
  })
  .catch((err)=>{
      return res.status(500).json({message:'movie not added',err})
  })
  
  .catch((err)=>{
      return res.status(500).json({message:'server error',err})
  })


})

// update movie

router.put('/:title',(req,res)=>{
  // find movie based on parameters
  Movie.findOne({title:req.params.title})
  .then((movie)=>{
      if(movie){
          //redefine definition 
          movie.title = req.body.title?req.body.title:movie.title
          //save definition
          //save movie
          movie.save()
          .then(updated=>{
              return res.status(200).json({message:'title has been updated',updated})
          }).catch(err => res.status(418).json({message:'title not updated',err}))
      }else{
          return res.status(200).json({message:'movie does not exist'})
      }
  }).catch((err)=> res.status(500).json({message:'server error',err}))
})

//delete a movie
router.delete('/:title',(req,res)=>{
  Movie.findOneAndDelete({title:req.params.title})
  .then((movie)=>{
      if(movie){
          return res.status(200).json({message:'movie deleted'})
      }else{
          return res.status(200).json({message:'no movie to delete'})
      }
  }).catch(err => res.status(400).json({message:"movie not deleted",err}))
  
})



module.exports = router;
