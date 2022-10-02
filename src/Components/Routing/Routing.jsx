import React, { useState } from 'react';
import Register from '../../Pages/Register/Register';
import Login from '../../Pages/Login/Login';
import Home from '../../Pages/Home/Home';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import { auth } from '../../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

const Routing = () => {

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    return (
        <Router>
            <Routes>
                <Route exact path='/' element={user ? <Home /> : <Login />}></Route>
                <Route exact path='/register' element={< Register />}></Route>
            </Routes>
        </Router>
    )
};

export default Routing;