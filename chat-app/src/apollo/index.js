import { split, HttpLink, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { getToken } from '../utils/tokenUtils';

const uri = 'https://gossip-graphql-server.herokuapp.com/';
const httpLink = new HttpLink({
    uri,
    headers: {
        authorization: getToken(),
    },
});

const wsLink = new WebSocketLink({
    uri: 'wss://gossip-graphql-server.herokuapp.com/',
    options: {
        reconnect: true,
        connectionParams: {
            authorization: getToken(),
        },
    },
    headers: {
        authorization: getToken(),
    },
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    credentials: 'include',
});

export default client;
