import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateUserData, fetchData, login } from '../store/userSlice'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import { ReactQueryDevtools } from "react-query/devtools";
// import getUserData from './userdata'
import Header from './Header';
import withAuth from './login/withAuth';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';
import Navigation from './navigation';

function App() {
    let _isMounted = false;
    const [helmetTitle, setHelmetTitle] = useState("Half Marathons");
    const themeEnum = {
        DARK: 'dark',
        LIGHT: 'light'
    }
    const [theme, setTheme] = useState(themeEnum.DARK);

    useEffect(() => {
        _isMounted = true;
        if (_isMounted) {
            setHelmetTitle(handleTitle(window.location.hash))
        }
        return () => {
            _isMounted = false;
        }
    }, []);


    const handleTitle = (hash) => {
        const path = hash.replace(/^#\//, '');
        const titleMap = {
            dashboard: 'Dashboard',
            login: 'Login',
            defaultTitle: 'Half Marathon'
        }

        if (helmetTitle !== titleMap[path]) {
            setHelmetTitle(titleMap[path] || titleMap['defaultTitle']);
        }
    }

    const toggleTheme = () => {
        theme === themeEnum.DARK
            ? setTheme(themeEnum.LIGHT)
            : setTheme(themeEnum.DARK);
    }

    return (
        <div className={ theme }>
            <Router>
                <Helmet>
                    <title>{ helmetTitle }</title>
                </Helmet>
                <Navigation toggleTheme={ toggleTheme }/>
                <main>
                    <Route path='/Dashboard' component={ withAuth(Dashboard) } />
                    <Route path='/Login' render={() => <Login />} />
                </main>
            </Router>
        </div>
    )
}

export default App;
