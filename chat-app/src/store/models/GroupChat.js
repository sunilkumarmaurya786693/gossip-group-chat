import { thunk, action } from 'easy-peasy';
import client from '../../apollo/index';
import { GET_GROUPS } from '../../queries';

const defaultValues = {
    groups: [],
    new_messages: [],
};

export default {
    setData: action((state, payload) => {
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
                actions.setData({ groups: resp.data.get_groups });
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
