import { gql } from '@apollo/client';

export const GET_GROUPS = gql`
    query getGroups {
        get_groups {
            id
            group_name
            createdAt
            members {
                id
                user_name
            }
            messages {
                content
                createdAt
                sender {
                    id
                    user_name
                }
            }
        }
    }
`;
