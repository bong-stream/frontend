import React, { Component } from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
   const [token, setToken] = React.useState(
      window.localStorage.getItem('boongToken')
   );

   const changeToken = (token) => {
      setToken(token);
   };

   // * Sync with Local Storage
   React.useEffect(() => {
      window.localStorage.setItem('boongToken', token);
   }, [token]);

   return (
      <AuthContext.Provider
         value={{
            token,
            changeToken,
         }}
      >
         {props.children}
      </AuthContext.Provider>
   );
};
