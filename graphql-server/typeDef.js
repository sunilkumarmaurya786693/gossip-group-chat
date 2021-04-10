// GraphQL typeDef
const typeDefs = `
    type User {
        id: ID!
        user_name: String
        email: String
        password: String
        groups: [Group]
        messages: [Message]
        user_type: String
    }
    
    type Message {
        id: ID!
        sender: User
        group: Group
        content: String
        created_at: String
    }

    type Group {
        id: ID!
        group_name: String
        members: [User]
        created_at: String
    }

    type Query {
        get_messages: [Message]
        login(email:String!, password: String!): String
    }
    
    type Mutation {
        register(user_name: String!, email: String!, password: String!, user_type: String):User
        add_message(content: String!, group_id: String!, timeStamp: String): Boolean
        add_group_member (group_id: String!): Boolean
        create_group (group_name: String!): Boolean
    }
`;

module.exports = typeDefs;
