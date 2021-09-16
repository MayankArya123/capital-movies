import './App.css';
import { AppStateContextProvider } from './Components/AppState/AppState.context';
import { BrowserRouter as Router  , Route ,Switch} from 'react-router-dom';
import HomePage from './Components/Homepage/Homepage';
import Navigation from './Components/Navigation/Navigation';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import axios from "axios";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Favourites from './Components/Favourites/Favourites';

axios.defaults.withCredentials = true;


function App() {

  return (

    <div className="">

    <AppStateContextProvider>
  
      <Router>
           <Navigation/>

           <Switch>
      
           <Route  path="/signup" exact   component={SignUp} />
           <Route  path="/login" exact  component={Login} />
           <Route  path="/" exact  component={HomePage} /> 
           <Route  path="/favourites" exact  component={Favourites} /> 


           </Switch>
        
      </Router>
         
    </AppStateContextProvider>
    
    </div>

  );
}

export default App;

