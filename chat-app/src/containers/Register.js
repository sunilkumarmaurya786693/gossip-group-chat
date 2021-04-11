import React from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../widgets/InputBox';
import { useStoreActions } from 'easy-peasy';
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
        case 'name':
            return {
                ...state,
                [action.type]: action.payload,
            };
    }
};

const Register = () => {
    const history = useHistory();
    const [state, dispatch] = React.useReducer(reducer, {
        email: null,
        password: null,
        name: null,
    });
    const { registerUser } = useStoreActions((action) => action.login);

    const handleInputChange = (ev, type) => {
        dispatch({ type, payload: ev.target.value });
    };

    const handleFormDetailsSubmission = (details) => {
        registerUser({
            ...details,
            user_name: details.name,
        }).then((val) => {
            history.push('/login');
        });
    };

    return (
        <div className={styles.loginContainer}>
            <div> Register </div>
            <Input
                label="name"
                type="text"
                onChange={(ev) => handleInputChange(ev, 'name')}
                data-label="name"
                className={styles.inputBox}
            />
            <Input
                label="email"
                type="email"
                onChange={(ev) => handleInputChange(ev, 'email')}
                data-label="email"
                className={styles.inputBox}
            />
            <Input
                label="password"
                type="password"
                onChange={(ev) => handleInputChange(ev, 'password')}
                data-label="password"
                className={styles.inputBox}
            />
            <Button onClick={() => handleFormDetailsSubmission(state)}> Submit </Button>
        </div>
    );
};

export default Register;
