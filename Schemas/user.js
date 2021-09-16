const mongoose = require('mongoose')
const jwt= require('jsonwebtoken')

const  userSchema = mongoose.Schema({

    username:{
       type:String    
    },
    password:{
       type:String    
    },
    favourites:[

        {

    //    cardlistId:{
    //        type:String
    //    },
    //    cardlistTitle:{
    //        type:String
    //    },
    //    cards:[
    //        {
    //            cardId:{
    //                type:String
    //            },
    //            cardTitle:{
    //                type:String
    //            },
    //            cardDescription:{
    //                type:String
    //            }
    //        }
    //    ]
       
    }

    ],
    tokens:[
        {
            token:{ type:String  }

        }
    ]

})



// userSchema.methods.generateAuthToken = async function() {

//     try{
//        const token = jwt.sign({_id:this._id},process.env.SECRET_KEY)

//        console.log('seeing token',token)
//        this.tokens=this.tokens.concat({token:token})

//        await this.save()

//        return token
//     }
//     catch(err){
// console.log('8',error)
//     }

// }

const User= mongoose.model('users',userSchema)

 module.exports = User

