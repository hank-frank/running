import React, {useState, useEffect, useReducer} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateUserData, fetchData, login } from '../../store/userSlice'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';

function Dashboard() {
    const userState = useSelector((state) => state.user);
    const { authenticated, loginErrorMessage } = userState;
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);
    const [inputValues, setInputValues] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {userName: '', password: ''}
    );

    useEffect(() => {

    }, []);

    const testHandler = () => {
        // console.log(userData);
    }

    /* TODO: Move me to my own register component */
    const saveUser = async () => {
        /* TODO : move into THUNK*/
        let raw = await fetch('/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userName": "h",
                "first": "Henry",
                "last": "frank",
                "password": 'h'
            })
        });

        let data = await raw.json();
        console.log('RESPONSE : ', data);
    }

    const handleSubmit = () => {
        console.log(inputValues);
        // dispatch(login(inputValues));
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

export default Dashboard;