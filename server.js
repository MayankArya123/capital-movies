const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser')


// dotenv.config({path:'./Config/.env'})

const {MONGO_URI,PORT} = require('./Config/keys')



mongoose.connect(MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then((succs)=>{

    if(succs){
        console.log('Mongodb database connection established')
    }
 
}).catch((err)=>{
    console.log('error while connecting to database',err)
})



//in production delete the proxy in client package.json file

// const whitelist = ['http://localhost:3000', 'https://trello-mern.herokuapp.com'];


//not required but understand it usecase


// const corsOptions = {
//   credentials: true, // This is important.
//   origin: (origin, callback) => {
//     if(whitelist.includes(origin))
//       return callback(null, true)

//       callback(new Error('Not --------- allowed by CORS'));
//   }
// }

app.use( cors())
app.use(express.json())
app.use(cookieParser())


//change the value of 1st header to  http://localhost:3000 in prod mode


  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://capital-movies1.herokuapp.com");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  

// //Set global variable to render on page
// app.use(function(req,res,next){
//     res.locals.user=req.username || null
//     next()
// })


app.use('/user',require('./Router/auth'))
app.use('/',require('./Router/movies'))

  
if(process.env.NODE_ENV === 'production'){

    app.use(express.static('client/build'))

    app.get('*', (req,res)=> {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}



app.listen(PORT,()=>{

  console.log('server listening at port ',PORT)

})





