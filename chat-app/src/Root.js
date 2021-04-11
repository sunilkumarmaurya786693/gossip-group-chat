import React from 'react';
import { StoreProvider } from 'easy-peasy';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes.js';

const Root = () => {
    console.log('routes', Routes);
    return (
        <BrowserRouter>
            <StoreProvider store={store}>
                <Routes />
            </StoreProvider>
        </BrowserRouter>
    );
};

export default Root;
