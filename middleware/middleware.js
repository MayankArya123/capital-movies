const jwt = require('jsonwebtoken')
const User = require('../Schemas/user')
const cookieParser = require('cookie-parser')



const {JWT_SECRET} = require('../Config/keys')


const authenticate= async(req,res,next)=>{


    try{

        console.log('cookie in middlware',req.cookies)

        const {jstoken} = req.cookies

        // const token= req.cookies.jwtoken;

        const verifyToken= jwt.verify(jstoken,JWT_SECRET)

        const rootUser = await User.findOne({ _id: verifyToken._id  ,  "tokens:tokens" : jstoken})


        if(!rootUser)   {


            console.log('no user matches')

            throw new Error('User not found')

        }


        // console.log('token',token)
        // console.log('auth token',req.header('x-auth-token'))
        // console.log('auth jwt token',req.headers.authorization)
        // console.log('cookie',res.cookies)
        // console.log('cookie',res.cookie)
        // console.log('cookie',req.cookie)

    console.log('rootUser',rootUser.id)

        req.token = jstoken
        req.rootUser = rootUser
        req.userID=rootUser._id

        next()

    }
    catch(err) {
          console.log('error in authenticate middleware',err)
          res.status(401).json({ errorMessage: "Unauthorized" });
           
    }

}



module.exports=authenticate