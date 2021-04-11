import { thunk, action } from 'easy-peasy';
import client from '../../apollo/index';
import { GET_USERS } from '../../queries/chat';

const defaultValues = {
    name: '',
};

export default {
    getSomeQuery: thunk((actions, payload) => {
        return client
            .query({
                query: GET_USERS,
                variables: payload,
            })
            .then((resp) => resp);
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
