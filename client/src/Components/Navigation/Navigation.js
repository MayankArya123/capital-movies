import {React,useContext,useEffect,useState} from 'react'
import { AppStateContext } from "../AppState/AppState.context";
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import "./Navigation.css";
import axios  from 'axios'


function Navigation() {

  const location = useLocation();


  console.log('location',location)

    const {  MoviesData , setMoviesData ,FMoviesData,setFMoviesData,  IsLoggedIn,setIsLoggedIn ,setLoginMessage  } = useContext(AppStateContext);
    // const [LogoutMessage,setLogoutMessage] = useState('')
    const [RedirectFlag,setRedirectFlag] = useState(false)
    const [RedirectFlag2,setRedirectFlag2] = useState(false)
    // const [Count,setCount] = useState(0)
     const [RedirectFlag1,setRedirectFlag1] = useState(false)

   //  const see = ''f



    useEffect(()=>{

      console.log('hitting useEffect')
      

      const data = {
        search : 'popular'
      }
    

      axios.get('/user/isLoggedIn',data).then((res)=>{

        // console.log('console.log',res.data.data.results)

        
        console.log('enter',typeof(res.status) ,res.status)
 
        if(res.status === 200) {

              
          console.log('logged in',res.data)

               setIsLoggedIn(res.data) 
    
          //  setMoviesData(res.data.data.results)
    
        }
    
      }).catch((err)=>{
    
        console.log('error from backend ',err)


      })




      axios.post('/GetMovies',data).then((res)=>{

        console.log('console.log',res.data.data.results)

        
        console.log('enter',typeof(res.status) ,res.status)
 
        if(res.status === 200) {

    
           setMoviesData(res.data.data.results)
    
        }
    
      }).catch((err)=>{
    
        console.log('error from backend ',err)
      })
    
//       console.log(' hitting navigation see ',se{  UserData,
// UserDataocalStorage.getItem("username") 


      // )

    },[])

     





   //    const see = 'mayank'

   //  console.log('Active',Active)

   //  console.log('see',see)



  // const LogOut=()=>{

  // console.log('hitting logout route')


  //  axios.get('/user/logout',  {
  //     "content-type": "application/json",
  //   }).then((res)=>{

  //     console.log('logout',res)
  //     setLoginMessage('logout successfully')
  //     setRedirectFlag(true)


  //     setTimeout(function(){
  //        console.log("Hello World");
  //        window.location.reload();
  //    }, 1000);
      
   

  //     // setCount(1)
  //     // setActive(res.data.username)
   

  //   }).catch((err)=>{
  //      console.log('error')
     
  //   })
 

  //  //  localStorage.setItem("username",'')

  // }



//   if(RedirectFlag1) {
//    // function alertFunc() {
//    //     // alert("Hello!");
//    //     console.log('h')
       
//    return <Redirect to="/login" />
//    //   }

//    // function myFunction() {
//    //     var myVar
//    //     myVar = setTimeout(alertFunc, 3000);
//    //   }

//    //   myFunction()
// }
//   if(RedirectFlag) {


//    // function alertFunc() {
//    //     // alert("Hello!");
//    //     console.log('h')
       
//    return <Redirect to="/login" />

//    //   }

//    // function myFunction() {
//    //     var myVar
//    //     myVar = setTimeout(alertFunc, 3000);
//    //   }

//    //   myFunction()
     


// }

  if(RedirectFlag){

    return <Redirect to="/favourites" />

  }

  if(RedirectFlag2){

    return <Redirect to="/login" />

  }

  if(RedirectFlag1){
        setTimeout(function(){
         console.log("Hello World");
         window.location.reload();
     }, 500);
    return <Redirect to="/" />

  }

  
const LogOut=()=>{

  console.log('hitting logout route')


   axios.get('/user/logout',  {
      "content-type": "application/json",
    }).then((res)=>{

      console.log('logout succesfuly',res)
      // setLoginMessage('logout successfully')
      // setRedirectFlag(true)


      setTimeout(function(){
         console.log("Hello World");
         window.location.reload();
     }, 1000);
      
   alert('logout successfully')

      // setCount(1)
      // setActive(res.data.username

    }).catch((err)=>{
       console.log('error')
     
    })
 

   //  localStorage.setItem("username",'')

  }



const MyFavourites=  (e)=>{

  // const data = {
  //   search : e.target.innerText
  // }

  // console.log('seeing name',e.target.innerText)

  setRedirectFlag(true)
  setTimeout(function(){
    console.log("Hello World");
    window.location.reload();
}, 500);
 

}






const GetMovies=  (e)=>{


  if(e.target.innerText === 'favourites')  {

    axios.get('/user/isLoggedIn').then((res)=>{

      // console.log('console.log',res.data.data.results)      
      console.log('enter',typeof(res.status) ,res.status)

      if(res.status === 200) {
      

        const data = {
          search : e.target.innerText
        }
      
        console.log('seeing name',e.target.innerText)
      
       
        axios.post('/GetMovies',data).then((res)=>{
      
          console.log('console.log',res.data.data.results)
      
          if(res.status === 200) {
      
             setMoviesData(res.data.data.results)
    
              // setRedirectFlag1(true)
           
      
          }
      
        }).catch((err)=>{
      
          console.log('error from backend ',err)






        })
      
        // console.log('logged in',res.data)

            //  setIsLoggedIn(res.data) 
  
        //  setMoviesData(res.data.data.results)
  
      }
  
    }).catch((err)=>{
  
      console.log('error from backend ',err)


      alert('please login to see all favourites movies or  your LoggedIn time is expired please login again ')

    //   setTimeout(function(){
    //     console.log("Hello World");
    //     window.location.reload();
    // }, 1000);
    //    setLoginMessage('your LoggedIn time is expired please login again or might there is a error in the database please login again')
    
    //    setRedirectFlag2(true)


    })




  }


  else {






    const data = {
      search : e.target.innerText
    }
  
    console.log('seeing name',e.target.innerText)
  
   
    axios.post('/GetMovies',data).then((res)=>{
  
      console.log('console.log',res.data.data.results)
  
      if(res.status === 200) {
  
         setMoviesData(res.data.data.results)
        //  setRedirectFlag1(true)
      //    setTimeout(function(){
      //     console.log("Hello World");
      //     window.location.reload();
      // }, 300);
  
      }
  
    }).catch((err)=>{
  
      console.log('error from backend ',err)
    })
  
  }

}


const GoToHome=()=>{


     setRedirectFlag1(true)
         setTimeout(function(){
          console.log("Hello World");
          window.location.reload();
      }, 300);

  // console.log(': go to home')
  return <Redirect to="/" />
  

}


console.log('console.log',IsLoggedIn)


    return (
        <div className="">

        <div className="navigation-wrapper">

        <div className="navigation">

        <div className="first-navigation-half">

            <div className="brand">
               Capital Movies
            </div>

            <Link  className="link_first" onClick={()=> GoToHome() } > home </Link>

    
          

        { 
          
          ( location && location.pathname !== "/favourites" ) ?

          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              movies
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" onClick={(e)=>GetMovies(e)} >popular </a></li>
              <li><a class="dropdown-item" onClick={(e)=>GetMovies(e)} >favourites</a></li>
              <li><a class="dropdown-item" onClick={(e)=>GetMovies(e)} >latest</a></li>
            </ul>
          </div>  : ''
        
        }

                   
        {    (IsLoggedIn && IsLoggedIn.username) ?  <Link><a class="dropdown-item" onClick={(e)=>MyFavourites(e)} > my favourites </a></Link>  : ''   }
        {    (IsLoggedIn && IsLoggedIn.username) ?   ` welcome  ${IsLoggedIn.username} ` : ''   }
 

       

             </div>
         <div className="second-navigation-half">
           {    (IsLoggedIn && IsLoggedIn.username) ?   <Link  onClick={()=> LogOut() } > logout </Link>  :   <>    <Link to="/signup"> SignUp  </Link>    <Link to="/login"> login </Link>   </>  }
    </div>

    </div>

   
    

        </div>
       


        </div>
     
    )
}

export default Navigation
