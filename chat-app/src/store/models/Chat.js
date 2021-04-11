import { thunk, action } from 'easy-peasy';
import client from '../../apollo/index';
import { SEND_MESSAGE } from '../../queries';

const defaultValues = {
    name: '',
};

export default {
    sendMessage: thunk((actions, payload) => {
        console.log('payload', payload);
        return client
            .mutate({
                mutation: SEND_MESSAGE,
                variables: payload,
            })
            .then((resp) => resp)
            .catch((err) => {
                throw err;
            });
    }),
    setTestState: action((state, payload) => {
        return {
            ...state,
            name: payload.name,
        };
    }),

    resetReduxState: action(() => {
        return {
            ...defaultValues,
        };
    }),
};
