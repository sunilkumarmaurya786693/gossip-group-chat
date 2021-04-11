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
