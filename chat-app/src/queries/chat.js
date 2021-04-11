import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query getUsers {
        get_users {
            id
            user_name
            email
            password
            groups {
                group_name
            }
            messages {
                id
                sender {
                    user_name
                }
            }
            user_type
        }
    }
`;

export const SEND_MESSAGE = gql`
    mutation addMessage($content: String!, $group_id: String!) {
        add_message(content: $content, group_id: $group_id)
    }
`;

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
