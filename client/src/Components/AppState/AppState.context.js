import { createContext, useState } from "react";
// import { appState, reducer } from "./AppState.reducer";

export const AppStateContext = createContext();


export const AppStateContextProvider = ({ children }) => {

    const [MoviesData,setMoviesData] = useState([])

    const [LoginMessage,setLoginMessage] = useState('')
    const [IsLoggedIn,setIsLoggedIn] = useState([])

//   const stateAndDispatch = useReducer(reducer, appState);

  return (
    <AppStateContext.Provider value={{ MoviesData ,setMoviesData ,IsLoggedIn ,setIsLoggedIn ,setLoginMessage ,LoginMessage }} >
      {children}
    </AppStateContext.Provider>
  );

  
};
