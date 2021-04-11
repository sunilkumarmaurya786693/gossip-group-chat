import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root.js';
import { ApolloProvider } from '@apollo/client/react';
import client from './apollo';

const render = () => {
    ReactDOM.render(
        <ApolloProvider client={client}>
            <Root />
        </ApolloProvider>,
        document.getElementById('root')
    );
};

render();
