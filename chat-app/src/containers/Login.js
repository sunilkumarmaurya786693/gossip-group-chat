import React from 'react';
import { useStoreActions } from 'easy-peasy';
import { useHistory } from 'react-router-dom';
import Input from '../widgets/InputBox';
import { Button } from '@material-ui/core';
import styles from './Login.modules.css';

const reducer = (state, action) => {
    switch (action.type) {
        case 'email':
            return {
                ...state,
                [action.type]: action.payload,
            };
        case 'password':
            return {
                ...state,
                [action.type]: action.payload,
            };
    }
};

const Login = () => {
    const history = useHistory();
    const [state, dispatch] = React.useReducer(reducer, {
        email: null,
        password: null,
    });
    const { loginUser } = useStoreActions((action) => action.login);

    const handleInputChange = (ev) => {
        dispatch({ type: ev.target.type, payload: ev.target.value });
    };

    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(null, args), delay);
        };
    };

    const handleLoginDetailsSubmission = (details) => {
        loginUser(details).then((resp) => {
            history.push('/');
        });
    };

    return (
        <div className={styles.loginContainer}>
            <div> Login </div>
            <Input
                label="email"
                type="email"
                onChange={debounce(handleInputChange, 500)}
                data-label="email"
                className={styles.inputBox}
            />
            <Input
                label="password"
                type="password"
                onChange={debounce(handleInputChange, 500)}
                data-label="password"
                className={styles.inputBox}
            />
            <Button onClick={() => handleLoginDetailsSubmission(state)}> Submit </Button>
        </div>
    );
};

export default Login;
