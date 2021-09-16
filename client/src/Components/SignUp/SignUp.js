import React,{useState} from 'react'
import axios from 'axios'

function SignUp() {
    
const [Username,setUsername] = useState('')
const [Password,setPassword] = useState('')
const [ErrorMessage,setErrorMessage] = useState('')
const [SuccsMessage,setSuccsMessage] = useState('')

    const SignUp=(e)=>{

        e.preventDefault()


        
   if(Username === '') {
    setErrorMessage('username can not be empty')
   }

   else {

       if(Password === '') {
           setErrorMessage('password can not be empty')
       }

       else {
           
        const SignUpDetails ={
            username:Username,
            password:Password
        }
     
        axios.post('/user/register',SignUpDetails).then((res)=>{
     
         console.log('register response from backend',res)

         if(typeof(res.data.msg) === 'string') {

            setErrorMessage(res.data.msg)
            setSuccsMessage('')

        }

         else {

            
         if(res.status === 200) {
            setSuccsMessage('user successully registerd')
            setErrorMessage('')
        }

        
         }
     
     
        }).catch((err)=>{
     
         console.log('register response from backend',err)
     
        })
     
       }

     
    }
      }

    return (
        <div>

        <form>


        { 
            ErrorMessage && <p> {ErrorMessage} </p>

        }

        { 
            SuccsMessage && <p> {SuccsMessage} </p>

        }


        <div class="mb-3">
          <label for="name" class="form-label">create username</label>
          <input type="name" onChange={ (e)=> setUsername(e.target.value) } class="form-control" id="name" aria-describedby="name"/>
        </div>


        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">create Password</label>
          <input type="password" onChange={ (e)=> setPassword(e.target.value) } class="form-control" id="exampleInputPassword1"/>
        </div>

        <button type="submit" onClick={(e)=> SignUp(e) } class="btn btn-primary"> submit</button>
      </form>

        </div>
    )
}

export default SignUp