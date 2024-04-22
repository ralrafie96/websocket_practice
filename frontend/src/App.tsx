import React, { createContext, useContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Router } from './components/router';
import { BrowserRouter } from 'react-router-dom';

const setUser: any = null;

export const UserContext = createContext({
    user: "",
    setUser: setUser
  })

function App() {
    const [ user, setUser ] = useState('')
    const value = { user, setUser }
    return (
        <UserContext.Provider value={value}>
            <Router />
        </UserContext.Provider>
    );
}

export default App;
