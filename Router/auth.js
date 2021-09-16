const express = require('express')
const  User  = require('../Schemas/user')
const router = express.Router()
// const cookieParser = require('cookie-parser')

const jwt = require('jsonwebtoken')
const authenticate = require('../middleware/middleware')
const {JWT_SECRET} = require('../Config/keys')



router.post('/register',(req,res)=>{



    // console.log('auth token',req.header('x-auth-token'))
    // console.log('auth jwt token',req.headers.authorization)
    // console.log('cookie',res.cookies)
    // console.log('cookie',res.cookie)
    // console.log('cookie',req.cookie)
    // console.log('cookie',req.cookies)

    const {username,password} = req.body

    console.log('hitting register route',username,password)

    const newUser = User({
        
     username:username,

     password:password

    })


    User.collection.findOne({username:username }).then((succs)=>{

        if(succs) {
            console.log('succs',succs)
            res.status(201).json({msg:'this username is already registered try some other'})
        }
        else {

            User.collection.insertOne(newUser).then((succs)=>{

                if(succs){

                //     console.log('jwt secret',JWT_SECRET,succs)

                //     // const token = jwt.sign({ id: succs._id }, JWT_SECRET, {
                //     //     expiresIn: 3600
                //     //   })

                // res.cookie('mycookie','mayank' , {
                //         expires:new Date(Date.now() + 30000 ),
                //         httpOnly:true,
                //         SameSite:None,
                //         Secure:true
                //     })


                    // res.cookie('jstoken',jwttoken ,{
                    //     expires:new Date(Date.now() + 30000 ),
                    //     httpOnly:true
                    // })

                    //   if(token) {
                    //       console.log('token succesfully created',token)
                    //   }
          
                      res.status(200).json({
                        user: {
                          id: succs._id,
                          name: succs.username
                        }
                      });
          
                }
              }).catch((err)=>{
                  console.log('err while saving to database' ,err)
              })
          

        }

    }).catch((err)=>{
        console.log('error')
        res.json(err)
    })

  


})


// router.get('/homeroute/token', authenticate,(req,res)=>{


// //  console.log('hitting logout route')

// //   res.clearCookie('jstoken')

//   res.json({msg:'enter the user'})



// })


router.get('/isLoggedIn', authenticate  ,(req,res)=>{


 console.log('is Logged in route hitting')


 res.json(req.rootUser)
 

//   res.clearCookie('jstoken')

//   res.json('logout successfully')



})



router.get('/logout' ,(req,res)=>{



 console.log('hitting logout route')

  res.clearCookie('jstoken')

  res.json('logout successfully')



})







// router.get('/getUserLists', authenticate,(req,res)=>{

//     //   const {prop} = req.body

//       console.log('hitting getUserLists route')

    //   res.cookie('mycookie','mayank' , {
    //     expires:new Date(Date.now() + 30000 ),
    //     httpOnly:true
    // })

    // console.log('seeing',req.userID)
    // console.log('seeing2',req.rootUser)


    // res.json(req.rootUser)


    // res.status(200).json('send')


    // // const {username,password} = req.body
    // // console.log('hitting login route',username,password)

    // // const LoginUserDetails = User({
        
    // //  username:username,

    // //  password:password

    // // })

    // User.collection.findOne({username:'mayank'}).then((succs)=>{    
    //   if(succs){
    //       console.log('got the user',succs)
    //       res.json(succs)
    //   }
    //   else {
    //     //   console.log('en',succs)
    //       res.json({msg:''})
    //   }
    // }).catch((err)=>{

    //     res.status(401).json('hhh')
    //     console.log('err while finding the user' ,err)
    // })



// })


// router.post('/updatelistTitle',authenticate , (req,res)=>{

//     const {cardlistID,text} = req.body

//     console.log('hitting updated list route',cardlistID,text)


//     // const LoginUserDetails = User({
        
//     //  username:username,

//     //  password:password

//     // })

//     User.collection.updateOne( 
        
//         {
//             _id:req.userID , 'cardlist.cardlistid': cardlistID } , { $set:
//         {
//           'cardlist.$.title':text
//         }

//      }).then((succs)=>{
//       if(succs){
//           console.log('title updated',succs)
//           res.json('succs')
//       }
//     }).catch((err)=>{
//         console.log('err while updating the title' ,err)
//     })

// })

router.post('/login', async (req,res)=>{


    console.log('hitting login route')





    // console.log('auth token',req.header('x-auth-token'))
    // console.log('auth jwt token',req.headers.authorization)
    // console.log('cookie',res.cookies)
    // console.log('cookie',res.cookie)
    // console.log('cookie',req.cookie)
    // console.log('cookie',req.cookies)


    // res.cookie('mycookie','mayank' , {
    //     expires:new Date(Date.now() + 30000 ),
    //     httpOnly:true
    // })


    // res.status(200).json('ddd')

    try {

        const {username,password} = req.body

        console.log('hitting login route',username,password)

        // const LoginUserDetails = User({
            
        //  username:username,
    
        //  password:password
    
        // })
    
        User.collection.findOne({username:username}).then((succs)=>{
    
          if(succs){
              console.log('got the user',succs)
    
              if(succs.password === password ) {
    
                console.log('password matches')
    
                console.log('jwt secret',JWT_SECRET)
    
                // token = await succs.generateAuthToken()

                const jwttoken = jwt.sign({_id:succs._id},JWT_SECRET)

if(jwttoken) {

    console.log('succs.generateAuthToken',jwttoken)  

    console.log('token created successfully')


    const tokenObject={
        token:jwttoken
    }

    User.collection.updateOne( {_id:succs._id},  {

        $push: {
            tokens : tokenObject
        } 

    }
    ).then((data)=>{

        console.log('hitting which document',succs._id)
        if(data) {
            console.log('token added to database as a object with token key')


            // res.status(200).json({
            //     jwttoken,
            //     user: {
            //       id: succs._id,
            //       username: succs.username,
            //       password: succs.password
            //     }})


                // res.cookie('access_token',jwttoken,{ sameSite:true})

                // res.json('done')


                   res.cookie('jstoken',jwttoken ,{
                        expires:new Date(Date.now() + 1200000),
                        sameSite: true,
                    })


                res.json(succs)


            // res.cookie()

        }


    }).catch((err)=>{
        console.log('errror',err)
    })



}

              
            }

            
              else {
                  console.log('----------------password do not match')
                  res.json({msg:'password do not match'})
              }
    
            //   res.json('succs')
          }
    
          else {
              console.log('this username is not registered')
    
              res.json({msg:'this username is not registered'})
          }
    
        }).catch((err)=>{
            console.log('err while finding the user' ,err)
        })

    }

    catch (err) {
        console.log('error',err)
    }


})


// router.get('/check', authenticate, (req,res)=>{



// console.log('hitting checking logged in  route',req.rootUser)



// res.json(req.rootUser)





// })


// router.post('/deleteCardofSelectedList', authenticate ,(req,res)=>{

//     const {cardID,cardlistID} = req.body

//     console.log('delete selected card route hitting route hitting',cardID,cardlistID)

//     // const LoginUserDetails = User({
        
//     //  username:username,

//     //  password:password

//     // })


//     User.collection.findOneAndUpdate({_id:req.userID , 'cardlist.cardlistid': cardlistID   }, { $pull: { 'cardlist.$.cards': { cardid: cardID } } } ).then((succs)=>{
//       if(succs){
//           console.log('deleted card successfully',succs)
//           res.json(succs)
//       }
//     }).catch((err)=>{
//         console.log('err while deleting the card' ,err)
//     })

// })

// router.post('/deleteUserlist', authenticate ,(req,res)=>{





//     const {cardlistID} = req.body

//     console.log('delete cardlist route hitting',cardlistID)

//     // const LoginUserDetails = User({
        
//     //  username:username,

//     //  password:password

//     // })


//     User.collection.findOneAndUpdate( {  _id:req.userID,  

//     'cardlist.cardlistid': cardlistID 

// }, { $pull: { cardlist: { cardlistid: cardlistID } } } ).then((succs)=>{
//       if(succs){
//           console.log('deleted user',succs)
//           res.json(succs)
//       }
//     }).catch((err)=>{

//         if (err.name === 'MongoError' && err.code === 11000) {
//             // Duplicate username
//             return res.status(422).send({ succes: false, message: 'User already exist!' });
//           }
    
//           // Some other error
//           return res.status(422).send(err);
    

//         // console.log('err while deleting the user' ,err)
//     })

// })


// router.post('/addCard', authenticate, (req,res)=>{

//     const {cardid,title,description,cardlistID} = req.body

//     console.log('hitting addCard route',cardid,title,description,cardlistID)

//     const cardDetails ={

//         cardid:cardid,
//         title:title,
//         description:description,
//     }

//     // cardlist: { $elemMatch: { cardlistid: cardlistID } } 

//     // const LoginUserDetails = User({
        
//     //  username:username,

//     //  password:password

//     // })

//     User.collection.updateOne({_id:req.userID,  

//                    'cardlist.cardlistid': cardlistID 

//      },

//      {
//                  $push: {
//                          'cardlist.$.cards' : cardDetails
//                   },
//      }

  
     
//      ).then((succs)=>{

//           console.log('updated the cardlist',succs)

//              res.json(succs)
          
//         //     succs[0].


//             // $push: {
//             //     cardlist : {
//             //         cards:cardDetails
//             //     }
//             // }

//      }).catch((err)=>{

//         console.log('error while updating the array selected cardlist data')

//      })

//     //  }).then((succs)=>{
//     //         console.log('successfully updated card',succs)
//     //     })
//     // .catch((err)=> {
//     //         console.log('error on adding card on selected card',err)

//     //     })
//     // }).catch((err)=>{
//     //             console.log('err while adding card ' ,err)
//     //         })

// })




// router.post('/addList', authenticate, (req,res)=>{

//     const {title,id,cards} = req.body

//     console.log('add List', title, typeof(id), cards)

//     console.log('req',req.userID)

//     const addListDetails = {
           
//         title:title,
//         cardlistid:id,
//         cards:cards
        
//    }

//       User.collection.findOneAndUpdate({_id:req.userID},  {

//         $push: {
//             cardlist : addListDetails
//         },
      

// }  ,  { new: true } ,{returnNewDocument:true } 
//         ).then((succs)=>{

//       if(succs){
//           console.log('updated the user the user',succs)

    
//           res.json(succs)
//       }
//     }).catch((err)=>{
//         console.log('err while updating the user' ,err)
//     })



//     // const addList = User({
        
//     //  username:,

//     //  password:password

//     // })


// })




module.exports=router





