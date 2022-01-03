import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateUserData, login } from '../../store/userSlice'
import {Redirect} from "react-router-dom";

function Login() {
    const userState = useSelector((state) => state.user);
    const { authenticated, loginErrorMessage } = userState;
    const dispatch = useDispatch();
    const [inputValues, setInputValues] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {userName: '', password: ''}
    );
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        console.log(`LOGIN USE EFFECT `, authenticated, ":", loginErrorMessage, );
        if (authenticated) setRedirect(true);
    }, [authenticated]);

    const captureInput = (event) => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    const tester = () => {
        console.log(inputValues.userName);
        console.log(inputValues.password);
    };

    const handleSubmit = () => {
        dispatch(login(inputValues));
    };

    return (
        <div className="login-wrapper panel">
            <button id="test" onClick={ tester }>Testing form login</button>
            <form className="login-group" onSubmit={ handleSubmit }>
                <div className="center-inputs">
                        <input type="text" className="login-input" name="userName" placeholder="Username" onChange={captureInput} />
                        <input type="password" className="login-input" name="password" placeholder="password" onChange={captureInput}  />
                    <input type="submit" value="Submit" className="login-submit"/>
                </div>
            </form>
            {loginErrorMessage
                ?
                <div className="centered-horizontal">
                    <h4 className="login-error">{loginErrorMessage}</h4>
                </div>
                : null
            }
            { redirect ? <Redirect to="/dashboard" /> : null }
        </div>
    )
}

export default Login;
