import { createStore } from 'easy-peasy';

import chat from './models/Chat';
import login from './models/Login';
import groups from './models/GroupChat';

const getStoreModels = () => {
    return {
        chat,
        login,
        groups,
    };
};

export const store = createStore(getStoreModels(), {
    disableImmer: true,
});
