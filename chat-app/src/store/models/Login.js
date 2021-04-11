import { thunk, action } from 'easy-peasy';
import client from '../../apollo/index';
import { REGISTER_USER, LOGIN_USER } from '../../queries';
import { setToken } from '../../utils/tokenUtils';

const defaultValues = {
    token: '',
};

console.log(REGISTER_USER, LOGIN_USER, '<====');
export default {
    registerUser: thunk((__, payload) => {
        return client
            .mutate({
                mutation: REGISTER_USER,
                variables: payload,
            })
            .then((resp) => resp)
            .catch((err) => {
                throw err;
            });
    }),
    loginUser: thunk((actions, payload) => {
        return client
            .query({
                query: LOGIN_USER,
                variables: payload,
            })
            .then((resp) => setToken(resp.data.token))
            .catch((err) => {
                throw err;
            });
    }),

    setLoginDetails: action((state, payload) => {
        return {
            ...state,
            ...payload,
        };
    }),

    resetReduxState: action(() => {
        return {
            ...defaultValues,
        };
    }),
};
