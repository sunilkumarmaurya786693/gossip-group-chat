import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
    mutation registerUser($user_name: String!, $email: String!, $password: String!) {
        register(user_name: $user_name, email: $email, password: $password) {
            id
            user_name
            password
            groups {
                group_name
            }
            user_type
        }
    }
`;

export const LOGIN_USER = gql`
    query login($email: String!, $password: String!) {
        token: login(email: $email, password: $password)
    }
`;
