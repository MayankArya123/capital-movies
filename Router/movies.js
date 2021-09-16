const express = require('express')
const  User  = require('../Schemas/user')
const router = express.Router()
const axios = require('axios')
const authenticate = require('../middleware/middleware')
// const cookieParser = require('cookie-parser')

// const jwt = require('jsonwebtoken')
// const authenticate = require('../../trello/middlware/middleware')
// const {JWT_SECRET} = require('../../trello/Config/keys')



router.post('/AddToFavourites', authenticate ,(req,res)=>{


console.log('add to favourites route hitting',req.body)


console.log('getting id ', typeof(req.body.id))

if(req.userID)   {


    User.findOne({  _id : req.userID , 'favourites.id': req.body.id }).then((succs)=>{

        if(succs){

            console.log('already added to database',succs)
            res.status(201).json({msg:'this movie is already added to database'})

        }

        else {

            User.collection.findOneAndUpdate({_id:req.userID},  {

                $push: {
                    favourites : req.body
                },
              
        
        }  ,  { new: true } ,{returnNewDocument:true } 
                ).then((succs)=>{
        
              if(succs){
                  console.log('added to favourites',succs)
        
            
                  res.json(succs)
              }
            }).catch((err)=>{
                console.log('err while adding it to favourites' ,err)
            })


        }

    }) 
    .catch((err)=>{
        console.log('err while adding it to favourites' ,err)
    })



}



})



router.get('/GetMyFavouriteMovies' , authenticate  ,(req,res)=>{


console.log('hitting my favourites route')


User.find({_id:req.userID}).then((succs)=>{

    if(succs.length > 0){

        res.json(succs)

    }

}).catch((err)=>{

console.log('error while getting favourites movies',err)



})





})


router.post('/GetMovies',(req,res)=>{

   
    const {search} = req.body

    console.log(`seeing ${search} value`)


    if(search === 'popular') {


        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f6736faed6efe6c957be4c41af2414b6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`).then((succs)=>{

            console.log('response',succs)
        
            if(succs){
               var  CircularJSON = require('circular-json')
               const str = CircularJSON.stringify(succs)
               const h=  JSON.parse(str)
                res.status(200).json(h)
            }
        
            }).catch((err)=>{
        
            console.log('response',err)
        
            res.status(401).json(err)
        
            })

    }

    if(search === 'latest'  || search === 'favourites') {


        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f6736faed6efe6c957be4c41af2414b6&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`).then((succs)=>{

            console.log('response',succs)
        
            if(succs){
               var  CircularJSON = require('circular-json')
               const str = CircularJSON.stringify(succs)
               const h=  JSON.parse(str)
                res.status(200).json(h)
            }
        
            }).catch((err)=>{
        
            console.log('response',err)
        
            res.status(401).json(err)
        
            })

    }





})








module.exports=router





