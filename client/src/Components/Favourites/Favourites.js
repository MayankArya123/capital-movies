import { AppStateContext } from "../AppState/AppState.context";
import axios from 'axios'
import React,{useContext,useEffect,useState} from 'react'
import "./Favourites.css";
import { Redirect } from "react-router";

function Favourites() {


 const [FMoviesData,setFMoviesData] = useState([])
 const [RedirectFlag,setRedirectFlag] = useState(false)



 const { setLoginMessage} = useContext(AppStateContext);

   useEffect(()=>{

          axios.get('/GetMyFavouriteMovies').then((res)=>{

        console.log('console.log',res.data)
    
        if(res.status === 200) {
    
          console.log('response ',res)
    
              setFMoviesData(res.data[0].favourites)


            //   setRedirectFlag(true)
              
        //   setTimeout(function(){
        //     console.log("Hello World");
        //     window.location.reload();
        // }, 500);
          //  setMoviesData(res.data[0].favourites)
    
        }
    
      }).catch((err)=>{
    
        console.log('error from backend ',err)

    
        setTimeout(function(){
          console.log("Hello World");
          window.location.reload();
      }, 1000);
         setLoginMessage('your LoggedIn time is expired please login again or might there is a error in the database please login again')
      
           setRedirectFlag(true)

      })


  },[])




  if(RedirectFlag)  {

    return <Redirect to="/login" />

  }


    return (
    
  <div className="">
    
  <div className="homepage-container">

  <div className="row">
 

  {

    FMoviesData.length > 0 && FMoviesData.map((EI,index)=>{

       return   <div className="image_box col-lg-3 col-md-3 col-sm-4 col-xs-6 col-6" key={EI.id} >
       <img  className="image" src={'https://image.tmdb.org/t/p/w500'+ EI.poster_path} alt="" />

       <div className="image_below_heading">
           <p className="text-center">{EI.original_title}</p>
           <p>{`  rating  ${EI.vote_average}`}</p>
           <p>{`  release date ${EI.release_date}`}</p>
       </div>

      
    

       </div>

       

    })

  }

  </div>

  </div>

</div>
    )
}

export default Favourites
