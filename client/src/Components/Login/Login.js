import React,{useState,useContext} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import { AppStateContext } from "../AppState/AppState.context";
import { set } from 'mongoose';

function Login() {

    const [Username,setUsername] = useState('')
    const [Password,setPassword] = useState('')
    const [RedirectFlag,setRedirectFlag] = useState(false)
    const [ErrorMessage,setErrorMessage] = useState('')
    const [SuccsMessage,setSuccsMessage] = useState('')

    const {setUserData,UserData,LoginMessage,setLoginMessage} = useContext(AppStateContext);


console.log('login message ',LoginMessage)


 const Login=(e)=>{

   e.preventDefault()

   console.log('check',Username,Password)

   if(Username === '') {
    setErrorMessage('username can not be empty')
    // setLoginMessage('')
   }

   else {

       if(Password === '') {
           setErrorMessage('password can not be empty')
          //  setLoginMessage('')
       }


       else {


        // var OPTIONS = {
        //   url: "http://localhost:7000/user/login",
        //   method: "POST",
        //   data:{
        //       username:Username,
        //       password:Password,
        //       },
      
        // }
        const LoginDetails ={
            username:Username,
            password:Password
        }
     
        axios.post('/user/login',LoginDetails,  {
          "content-type": "application/json",
        }).then((res)=>{
     
         console.log('login response from backend',res)


           
          if(typeof(res.data.msg) === 'string' ) {
     
             setErrorMessage(res.data.msg)
             
            //  setLoginMessage('')
          }
     
          else {

                     if(res.status === 200){
                  console.log('succesfully logged in')
                  setSuccsMessage('succesfully logged in')
                  setErrorMessage('')
                  setRedirectFlag(true)
                  setTimeout(function(){
                    console.log("Hello World");
                    window.location.reload();
                }, 500);
                 
                  // setUserData([res.data])
                  // setLoginMessage('')
                  // localStorage.setItem("username",res.data.username)
                  // setActive(res.data."http://localhost:7000/"user.name)
              }

          }

        }).catch((err)=>{
     
         console.log('login response from backend',err)
         

     
        })


       }

   }

 

 }


 if(RedirectFlag) {

    return <Redirect to="/
    " />

}


    return (
        <div>

        <form>

                { 
                     ErrorMessage && <p> {ErrorMessage} </p>

                }

                { 
                     LoginMessage && <p> {LoginMessage} </p>

                }

        { /* ErrorMessage.length > 0 && ErrorMessage.map((ER)=> {
            return <p> {ER} </p>
        }) */  }

        <div class="mb-3">

          <label for="name" class="form-label"> username </label>
          <input type="name" onChange={(e)=> setUsername(e.target.value) } class="form-control" id="name" aria-describedby="name"/>
        </div>

        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" onChange={(e)=> setPassword(e.target.value) }  class="form-control" id="exampleInputPassword1"/>
        </div>

         <button type="submit" onClick={(e)=>Login(e)} class="btn btn-primary">login</button>            
      </form>

        </div>
    )
}

export default Login
