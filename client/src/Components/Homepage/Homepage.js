import { useContext,useEffect,useState } from "react";
import uuid from "react-uuid";
import { AppStateContext } from "../AppState/AppState.context";
// import { CardList } from "../Cardlist/Cardlist";
import "./Homepage.css";
import  axios from 'axios'
import { Redirect } from "react-router";

const HomePage = (props) => {

  // console.log('hitting homepage route',Active)

  // const [UserListData,setUserListData]  = useState({})

  const [RedirectFlag,setRedirectFlag] = useState(false)

  const { MoviesData,setMoviesData ,IsLoggedIn ,setLoginMessage} = useContext(AppStateContext);

  // console.log('seeing value',UserData)
//   const [AddListCount,setAddListCount]  = useState(0)

  useEffect(()=>{

  //  axios.get('/user/homeroute/token').then((res)=>{

  //         console.log('response form backend on userslist',res)

  //      if(res.msg === 'enter the user'){

  //        console.log('response',res)
  //        setRedirectFlag(false)
  //       //  setUserListData(res.data)

  //      }

  //     //  if(res.msg === 'notoken')

     
  //  }).catch((err)=>{


  //     console.log('error from backend ')
  

  //     setRedirectFlag(true)

  //     setLoginMessage('please login first to use and see the home page')
  
  
  //  })

  },[])

 

//   const [appState, dispatch] = stateAndDispatch;

//   let updatedState = [...appState];

//   console.log('seeing state  value',updatedState)

//   const storedState = JSON.parse(localStorage.getItem("userData"));

//   if (updatedState.length) updatedState = storedState.state;

  // const handleListAdd = () => {


  //   const newList = {
  //       id:uuid(),
  //       title:'',
  //       cards:[]
  //   }
  
  //   axios.post('/user/addList',newList).then((succs)=>{
  //         console.log('succs',succs)
  //         if(succs.status === 200) {
  //             console.log('succesfully added')
  //             axios.get('/user/getUserLists').then((res)=>{
  //               console.log('response form backend',res)
  //               setUserData([res.data])
           
  //        }).catch((err)=>{
  //            console.log('error from backend ',err)
  //        })
      
  //         }
  //   }).catch((err)=>{
  //         console.log('error',err)
  //         setLoginMessage('your LoggedIn time is expired please login again or might there is a error in the database please login again')
  //         setRedirectFlag(true)
  //         setTimeout(function(){
  //           console.log("Hello World");
  //           window.location.reload();
  //       }, 1000);
  //   })

  //   // updatedState.push({ id: uuid(), title: "", cards: [] });
  //   // dispatch({ type: "addList", value: updatedState });

  // };


//   if(RedirectFlag) {


//     // function alertFunc() {
//     //     // alert("Hello!");
//     //     console.log('h')
        
//     return <Redirect to="/login" />
//     //   }

//     // function myFunction() {
//     //     var myVar
//     //     myVar = setTimeout(alertFunc, 3000);
//     //   }

//     //   myFunction()
      


// }

  
 const AddToFavourites=(EI)=>{

 axios.post('/AddToFavourites',EI).then((res)=>{

    // console.log('console.log',res.data.data.results)

    if(res.status === 200) {


      console.log('added successfully',res,typeof(res.status))


      alert('added to my favourites')

      //  setMoviesData(res.data.data.results)

    }
    if(res.status === 201) {


      console.log('already added to favourites',res,typeof(res.status))


      alert('you have  already added this movie to my favourites')

      //  setMoviesData(res.data.data.results)

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


 }


 if(RedirectFlag){

   return <Redirect to="/login" />

 }


  console.log('seeing+++++++++',MoviesData)

  return (


  <div className="">
    
    <div className="homepage-container">

    <div className="row">
   

    {

      MoviesData.length > 0 && MoviesData.map((EI,index)=>{

         return   <div className="image_box col-lg-3 col-md-3 col-sm-4 col-xs-6 col-6" key={EI.id} >
         <img  className="image" src={'https://image.tmdb.org/t/p/w500'+ EI.poster_path} alt="" />

         <div className="image_below_heading">
             <p className="text-center">{EI.original_title}</p>
             <p>{`  rating  ${EI.vote_average}`}</p>
             <p>{`  release date ${EI.release_date}`}</p>
             {  (IsLoggedIn && IsLoggedIn.username)  ? <button className="btn btn-primary"  onClick={() => AddToFavourites(EI) }> Add to favourite </button> : ''  }
             </div>

        
      
  
         </div>
  
         

      })

    }

    </div>

    </div>

  </div>
 

  );

};

export default HomePage;

