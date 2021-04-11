import { split, HttpLink, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { getToken } from '../utils/tokenUtils';

const uri = 'https://gossip-graphql-server.herokuapp.com/';
const httpLink = new HttpLink({
    uri,
    headers: {
        authorization: getToken(),
    },
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    credentials: 'include',
});

export default client;
