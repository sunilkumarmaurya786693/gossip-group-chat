import { split, HttpLink, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { getToken } from '../utils/tokenUtils';

// import { getMainDefinition } from '@apollo/client/utilities';
// import { WebSocketLink } from '@apollo/client/link/ws';

const uri = 'https://gossip-graphql-server.herokuapp.com/';
const httpLink = new HttpLink({
    uri,
    headers: {
        authorization: getToken(),
    },
});

// const wsLink = new WebSocketLink({
//     uri,
//     options: {
//         reconnect: true,
//         headers: {
//             Authorization: token,
//         }
//     }
// });

// const splitLink = split(
//     ({ query }) => {
//         const definition = getMainDefinition(query);
//         return (
//             definition.kind === 'OperationDefinition' &&
//             definition.operation === 'subscription'
//         );
//     },
//     wsLink,
//     httpLink,
// );

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    credentials: 'include',
});

export default client;
