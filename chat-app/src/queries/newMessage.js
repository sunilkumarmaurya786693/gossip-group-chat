import { useQuery, gql, useSubscription } from '@apollo/client';
import React from 'react';

export const GET_NEW_MESSAGE = gql`
    subscription get_new_message {
        get_new_message {
            id
            content
            createdAt
            group {
                id
                group_name
            }
            sender {
                id
                user_name
            }
        }
    }
`;
