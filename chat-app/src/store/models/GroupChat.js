import { thunk, action } from 'easy-peasy';
import client from '../../apollo/index';
import { GET_GROUPS, GET_NEW_MESSAGE } from '../../queries';

const defaultValues = {
    groups: [],
};

export default {
    setData: action((state, payload) => {
        console.log('payload', payload);
        console.log('state', state);
        return {
            ...state,
            ...payload,
        };
    }),

    getGroups: thunk((actions, payload) => {
        return client
            .query({
                query: GET_GROUPS,
                variables: payload,
            })
            .then((resp) => {
                console.log('these are groups ------------', resp);
                actions.setData({ groups: resp.data.get_groups });
            })
            .catch((err) => {
                throw err;
            });
    }),

    getNewMessage: thunk((actions, payload) => {
        return client
            .subscribe({
                subscribe: GET_NEW_MESSAGE,
                variables: payload,
            })
            .then((resp) => {
                console.log('get new message--------', resp);
            })
            .catch((err) => {
                throw err;
            });
    }),

    resetReduxState: action(() => {
        return {
            ...defaultValues,
        };
    }),
};
