import { createStore } from 'easy-peasy';

import chat from './models/Chat';
import login from './models/Login';

const getStoreModels = () => {
    return {
        chat,
        login,
    };
};

export const store = createStore(getStoreModels(), {
    disableImmer: true,
});
